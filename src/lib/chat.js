import objectAssign from 'object-assign';
import {Promise} from 'es6-promise';
//import Promise from 'bluebird';

import ElementStore from './element-store.js';
import chatCss from '../css/chat.css';


import { default as $ } from './dom-utility.js';
import * as domUtility from './dom-utility.js';



const gitterUrl = 'https://gitter.im/';


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

let gitterSvgSprites = `
  <svg class="gitter-hidden">
    <defs>
      <symbol id="gitter-shape-times-circle" viewBox="0 0 1792 1792">
        <path d="M1225 1079l-146 146q-10 10-23 10t-23-10l-137-137-137 137q-10 10-23 10t-23-10l-146-146q-10-10-10-23t10-23l137-137-137-137q-10-10-10-23t10-23l146-146q10-10 23-10t23 10l137 137 137-137q10-10 23-10t23 10l146 146q10 10 10 23t-10 23l-137 137 137 137q10 10 10 23t-10 23zm215-183q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/>
      </symbol>
      <symbol id="gitter-shape-external-link" viewBox="0 0 1792 1792">
        <path d="M1408 928v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45 45-19h512q26 0 45 19t19 45z"/>
      </symbol>
      <symbol id="gitter-shape-spinner" viewBox="0 0 1792 1792">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"/>
      </symbol>
    </defs>
  </svg>
`;

let embedGitterSvgSprites = function() {
  let elementStore = new ElementStore();

  let tempContainer = document.createElement('div');
  tempContainer.insertAdjacentHTML('beforeend', gitterSvgSprites);
  let body = $('body')[0];
  domUtility.forEach(tempContainer.children, function(child) {
    body.appendChild(child);
    elementStore.push(child);
  });

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
      iframe.src = `${gitterUrl}${targetElementOpts.room}/~embed`;
      //iframe.src = `${gitterUrl}${targetElementOpts.room}/~chat`;

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
  layout: 'fixed'

  //showLeftMenu: false
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
      this[ELEMENTSTORE] = this[ELEMENTSTORE].concat(embedGitterStyles());
      this[ELEMENTSTORE] = this[ELEMENTSTORE].concat(embedGitterSvgSprites());
    }

    let targetElements = opts.targetElement;
    targetElements.forEach((targetElement) => {
      let loadingIndicatorElement = this[ELEMENTSTORE].createElement('div');
      loadingIndicatorElement.classList.add('gitter-chat-embed-loading-wrapper');
      loadingIndicatorElement.innerHTML = `
        <svg class="gitter-chat-embed-loading-indicator gitter-icon"><use xlink:href="#gitter-shape-spinner"></use></svg>
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
            button.href = `${gitterUrl}${opts.room}`;
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
      this[ELEMENTSTORE] = this[ELEMENTSTORE].concat(embedResult);

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
        popOutActionElement.innerHTML = '<svg class="gitter-icon"><use xlink:href="#gitter-shape-external-link"></use></svg>';
        elementOnActivate(popOutActionElement, (e) => {
          // Hide the chat
          this.toggleChat(false);

          // Open in new tab
          let win = window.open(`${gitterUrl}${this[OPTIONS].room}`, '_blank');
          win.focus();

          e.preventDefault();
        });

        actionBar.appendChild(popOutActionElement);


        let collapseActionElement = this[ELEMENTSTORE].createElement('button');
        collapseActionElement.classList.add('gitter-chat-embed-action-bar-item');
        collapseActionElement.setAttribute('aria-label', 'Collapse Gitter Chat');
        collapseActionElement.innerHTML = '<svg class="gitter-icon"><use xlink:href="#gitter-shape-times-circle"></use></svg>';
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




