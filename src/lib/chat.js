import objectAssign from 'object-assign';
import {Promise} from 'es6-promise';
//import Promise from 'bluebird';

import ElementStore from './element-store.js';
import chatCss from '../css/chat.css';


import { default as $ } from './dom-utility.js';
import * as domUtility from './dom-utility.js';




let parseAttributeTruthiness = function(value) {
  if(value) {
    let valueSanitized = value.trim().toLowerCase();
    if(valueSanitized === 'true' || valueSanitized === '1') {
      return true;
    }
    else if(valueSanitized === 'false' || valueSanitized === '0') {
      return false;
    }
  }

  return value;
};



// Pass in a shape object of options and the element
// and we will extend and properties available
// NOTE: We will only look for keys present in `options` passed in
let getDataOptionsFromElement = function(options, element) {
  if(!element) {
    return options;
  }

  let newOptions = {};
  Object.keys(options).forEach((optionKey) => {
    let attr = `data-${optionKey}`;
    if(element.hasAttribute(attr)) {
      let optionValue = element.getAttribute(attr);
      newOptions[optionKey] = optionValue;

    }
  });

  return objectAssign({}, options, newOptions);
};


// Helper method that detects whether an element was "activated"
// Returns a function that you can execute to remove the listeners
// Accibility in mind: click, spacebar, enter
const spacebarKey = 32;
const enterKey = 13;
let elementOnActivate = function(elements, cb) {
  elements = $(elements);

  let handler = function(e, ...args) {
    // If click or spacebar, or enter is pressed
    if(e.type === 'click' || (e.type === 'keydown' && (e.keyCode === spacebarKey || e.keyCode === enterKey))) {
      cb.call(this, e, ...args);
    }
  };
  domUtility.on(elements, 'click keydown', handler);

  return function() {
    domUtility.off(elements, 'click keydown', handler);
  };
};


let embedGitterStyles = function() {
  let elementStore = new ElementStore();

  let style = elementStore.createElement('style');
  style.innerHTML = chatCss;
  $('head')[0].appendChild(style);

  return elementStore;
};



  return elementStore;
};

let embedGitterChat = function(opts) {
  let elementStore = new ElementStore();

  let targetElements = opts.targetElement;

  targetElements.forEach((targetElement) => {
    let targetElementOpts = getDataOptionsFromElement(opts, targetElement);

    if(targetElementOpts.room) {
      let iframe = elementStore.createElement('iframe');
      iframe.setAttribute('frameborder', '0');
      iframe.src = `${opts.host}${targetElementOpts.room}/~embed`;
      //iframe.src = `${opts.host}${targetElementOpts.room}/~chat`;

      targetElement.appendChild(iframe);
    }
    else {
      console.error('Gitter Sidecar: No room specified for targetElement', targetElement);
    }

  });

  return elementStore;
};




const defaults = {
  room: undefined,
  // Single or array of dom elements, or string selector to embed chat in
  targetElement: null,
  // The button element used to activate when the chat gets shown on the page
  // Can be a dom node or a promise that optionally resolves to a dom node
  // Note: Only applies if `options.showChatByDefault` is `false`
  activationElement: undefined,

  // Whether to show the chat embed when the page loads
  // Note: Use with caution, useful for use cases where you have a page dedicated to chat.
  showChatByDefault: false,
  
  // Whether to preload the gitter chat iframe.
  // We preload the chat so there isn't any jank when the chat opens
  preload: false,

  // Whether to embed a `<style>` tag with some pre-made CSS
  useStyles: true,
  // TODO: implement layouts (see todo.md)
  //   - `fixed`
  //   - `off-canvas`
  //   - `flex-aside`
  layout: 'fixed',

  //showLeftMenu: false

  // Undocumented private options ;)
  // Base URL of the gitter instance you are running
  // We are not using a nice URL parser/formatter,
  // so make sure to add the trailing slash so that concating goes smooth
  host: 'https://gitter.im/'
};


// Keep some stuff behind symbols so people "can't" access the private data
const DEFAULTS = Symbol();
const OPTIONS = Symbol();
const ELEMENTSTORE = Symbol();
const EVENTHANDLESTORE = Symbol();
const INIT = Symbol();
const ISEMBEDDED = Symbol();
const EMBEDCHATONCE = Symbol();
const TOGGLETARGETELEMENTS = Symbol();

class chatEmbed {
  constructor(options = {}) {
    this[ELEMENTSTORE] = new ElementStore();
    this[EVENTHANDLESTORE] = [];
    
    this[DEFAULTS] = objectAssign({}, defaults);

    // Coerce into array of dom elements on what they pass in
    if(options.targetElement) {
      options.targetElementr = $(options.targetElement);
    }
    // Otherwise create our own default targetElement
    else {
      this[DEFAULTS].targetElement = $((() => {
        let targetElement = this[ELEMENTSTORE].createElement('aside');
        targetElement.classList.add('gitter-chat-embed');
        // Start out collapsed
        targetElement.classList.add('is-collapsed');
        document.body.appendChild(targetElement);

        return targetElement;
      })());
    }

    this[OPTIONS] = objectAssign({}, this[DEFAULTS], options);

    this[INIT]();
  }

  [INIT]() {
    let opts = this[OPTIONS];

    if(opts.useStyles) {
      this[ELEMENTSTORE].add(embedGitterStyles());
      this[ELEMENTSTORE].add(embedGitterSvgSprites());
    }

    let targetElements = opts.targetElement;
    targetElements.forEach((targetElement) => {
      let loadingIndicatorElement = this[ELEMENTSTORE].createElement('div');
      loadingIndicatorElement.classList.add('gitter-chat-embed-loading-wrapper');
      loadingIndicatorElement.innerHTML = `
        <div class="gitter-chat-embed-loading-indicator gitter-icon"></div>
      `;

      // Prepend
      targetElement.insertBefore(loadingIndicatorElement, targetElement.firstChild);
    });

    if(opts.preload) {
      this.toggleChat(false);
    }

    if(opts.showChatByDefault) {
      this.toggleChat(true);
    }
    else {
      Promise.resolve(opts.activationElement)
        .then((activationElement) => {
          activationElement = $(activationElement || (() => {
            let button = this[ELEMENTSTORE].createElement('a');
            // We use the option for the room (not pertaining to a particular targetElement attribute if set)
            button.href = `${opts.host}${opts.room}`;
            button.innerHTML = 'Open Chat';
            button.classList.add('gitter-open-chat-button');
            document.body.appendChild(button);

            return button;
          })());
          
          elementOnActivate(activationElement, (e) => {
            // Show the chat
            this.toggleChat(true);

            e.preventDefault();
          });

          opts.targetElement.forEach((targetElement) => {
            domUtility.on(targetElement, 'gitter-chat-toggle', (e) => {
              let isChatOpen = e.detail.state;
              // Toggle the visibiltiy of the activation element
              // so it is only there when the the chat is closed
              domUtility.forEach(activationElement, (element) => {
                element.classList.toggle('is-collapsed', isChatOpen);
              });
            });
          });
        });
    }

    // Listen to buttons with a class of `.js-gitter-toggle-chat-button`
    // We also look for an options `data-gitter-toggle-chat-state` attribute
    let classToggleButtonOff = elementOnActivate($('.js-gitter-toggle-chat-button'), (e) => {
      let state = parseAttributeTruthiness(e.target.getAttribute('data-gitter-toggle-chat-state'));
      this.toggleChat(state !== null ? state : 'toggle');

      e.preventDefault();
    });
    this[EVENTHANDLESTORE].push(classToggleButtonOff);


    // Emit for each targetElement
    opts.targetElement.forEach((targetElement) => {
      let event = new CustomEvent('gitter-chat-started', {
        detail: {
          chat: this
        }
      });
      targetElement.dispatchEvent(event);
    });

    // Emit for document
    let documentEvent = new CustomEvent('gitter-sidecar-instance-started', {
      detail: {
        chat: this
      }
    });
    document.dispatchEvent(documentEvent);
  }

  [EMBEDCHATONCE]() {
    if(!this[ISEMBEDDED]) {
      let opts = this[OPTIONS];

      let embedResult = embedGitterChat(this[OPTIONS]);
      this[ELEMENTSTORE].add(embedResult);

      let targetElements = opts.targetElement;
      targetElements.forEach((targetElement) => {
        let actionBar = this[ELEMENTSTORE].createElement('div');
        actionBar.classList.add('gitter-chat-embed-action-bar');

        // Prepend
        targetElement.insertBefore(actionBar, targetElement.firstChild);

       

        let popOutActionElement = this[ELEMENTSTORE].createElement('button');
        popOutActionElement.classList.add('gitter-chat-embed-action-bar-item');
        popOutActionElement.classList.add('gitter-chat-embed-action-bar-item-pop-out');
        popOutActionElement.setAttribute('aria-label', 'Open Chat in Gitter.im');
        elementOnActivate(popOutActionElement, (e) => {
          // Hide the chat
          this.toggleChat(false);

          // Open in new tab
          let win = window.open(`${opts.host}${this[OPTIONS].room}`, '_blank');
          win.focus();

          e.preventDefault();
        });

        actionBar.appendChild(popOutActionElement);


        let collapseActionElement = this[ELEMENTSTORE].createElement('button');
        collapseActionElement.classList.add('gitter-chat-embed-action-bar-item');
        collapseActionElement.setAttribute('aria-label', 'Collapse Gitter Chat');
        collapseActionElement.classList.add('gitter-chat-embed-action-bar-item-collapse-chat');
        elementOnActivate(collapseActionElement, (e) => {
          // Hide the chat
          this.toggleChat(false);

          e.preventDefault();
        });

        actionBar.appendChild(collapseActionElement);
        

      });
    }

    this[ISEMBEDDED] = true;
  }

  // state: true, false, 'toggle'
  [TOGGLETARGETELEMENTS](state) {
    let opts = this[OPTIONS];

    if(!opts.targetElement) {
      console.warn('Gitter Sidecar: No chat embed elements to toggle visibility on');
    }

    let targetElements = opts.targetElement;
    targetElements.forEach((targetElement) => {
      let wasCollapseClassAdded;
      if(state === 'toggle') {
        wasCollapseClassAdded = targetElement.classList.toggle('is-collapsed');
      }
      else {
        wasCollapseClassAdded = targetElement.classList.toggle('is-collapsed', !state);
      }

      // This is what happened after toggling the classes from the `state` input passed in
      let actualState = !wasCollapseClassAdded;

      let event = new CustomEvent('gitter-chat-toggle', {
        detail: {
          state: actualState
        }
      });
      targetElement.dispatchEvent(event);
    });
  }


  // Public API
  // state: true, false, 'toggle'
  toggleChat(state) {
    let opts = this[OPTIONS];

    // We delay the embed to make sure the animation can go jank free
    // if it isn't already embedded
    if(state && !this[ISEMBEDDED]) {
      let targetElements = opts.targetElement;
      // Start the loading spinner
      targetElements.forEach((targetElement) => {
        targetElement.classList.add('is-loading');
      });

      setTimeout(() => {
        this[EMBEDCHATONCE]();
        this[TOGGLETARGETELEMENTS](state);

        // Remove the loading spinner
        targetElements.forEach((targetElement) => {
          targetElement.classList.remove('is-loading');
        });
      }, 300/* TODO change to transition/animation end, see for robust transition/animation end code: https://github.com/MadLittleMods/jquery-carouselss */);
    }
    // But we still want people to embed no matter what state :)
    // For example `options.preload`, should load the chat but not show it
    else {
      this[EMBEDCHATONCE]();
      this[TOGGLETARGETELEMENTS](state);
    }
  }

  destroy() {
    // Remove all the event handlers
    this[EVENTHANDLESTORE].forEach(function(fn) {
      fn();
    });

    //console.log(this[ELEMENTSTORE]);
    // Remove and DOM elements, we made
    this[ELEMENTSTORE].destroy();
  }
}






export default chatEmbed;




