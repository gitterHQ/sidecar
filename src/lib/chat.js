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

let gitterSvgSprites = `
  <svg class="gitter-hidden">
    <defs>
      <symbol id="gitter-shape-times-circle" viewBox="0 0 171.429 171.429">
        <path d="M122.433,106.138l-16.295,16.295c-0.744,0.744-1.6,1.116-2.566,1.116c-0.968,0-1.823-0.372-2.567-1.116l-15.29-15.29 l-15.29,15.29c-0.744,0.744-1.6,1.116-2.567,1.116s-1.823-0.372-2.567-1.116l-16.294-16.295c-0.744-0.744-1.116-1.6-1.116-2.566 c0-0.968,0.372-1.823,1.116-2.567l15.29-15.29l-15.29-15.29c-0.744-0.744-1.116-1.6-1.116-2.567s0.372-1.823,1.116-2.567 L65.29,48.996c0.744-0.744,1.6-1.116,2.567-1.116s1.823,0.372,2.567,1.116l15.29,15.29l15.29-15.29 c0.744-0.744,1.6-1.116,2.567-1.116c0.967,0,1.822,0.372,2.566,1.116l16.295,16.294c0.744,0.744,1.116,1.6,1.116,2.567 s-0.372,1.823-1.116,2.567l-15.29,15.29l15.29,15.29c0.744,0.744,1.116,1.6,1.116,2.567 C123.549,104.539,123.177,105.394,122.433,106.138z M146.429,85.714c0-11.012-2.717-21.168-8.148-30.469 s-12.797-16.667-22.098-22.098S96.726,25,85.714,25s-21.168,2.716-30.469,8.147S38.579,45.945,33.147,55.246S25,74.703,25,85.714 s2.716,21.168,8.147,30.469s12.797,16.666,22.098,22.098s19.457,8.148,30.469,8.148s21.168-2.717,30.469-8.148 s16.666-12.797,22.098-22.098S146.429,96.726,146.429,85.714z M171.429,85.714c0,15.551-3.832,29.893-11.496,43.024 c-7.664,13.133-18.062,23.53-31.194,31.194c-13.132,7.664-27.474,11.496-43.024,11.496s-29.892-3.832-43.024-11.496 c-13.133-7.664-23.531-18.062-31.194-31.194C3.832,115.607,0,101.265,0,85.714S3.832,55.822,11.496,42.69 c7.664-13.133,18.062-23.531,31.194-31.194C55.822,3.832,70.164,0,85.714,0s29.893,3.832,43.024,11.496 c13.133,7.664,23.53,18.062,31.194,31.194C167.597,55.822,171.429,70.164,171.429,85.714z"/>
      </symbol>
      <symbol id="gitter-shape-external-link" viewBox="0 0 200 171.429">
        <path d="M157.143,103.571v35.714c0,8.854-3.144,16.426-9.431,22.713s-13.858,9.431-22.712,9.431H32.143 c-8.854,0-16.425-3.144-22.712-9.431S0,148.14,0,139.285V46.429c0-8.854,3.144-16.425,9.431-22.712 c6.287-6.287,13.858-9.431,22.712-9.431h78.572c1.041,0,1.896,0.335,2.566,1.004c0.67,0.67,1.004,1.525,1.004,2.567V25 c0,1.042-0.334,1.897-1.004,2.567c-0.67,0.67-1.525,1.004-2.566,1.004H32.143c-4.911,0-9.115,1.749-12.612,5.246 s-5.246,7.701-5.246,12.612v92.856c0,4.911,1.749,9.115,5.246,12.612s7.701,5.245,12.612,5.245H125c4.91,0,9.115-1.748,12.611-5.245 c3.497-3.497,5.246-7.701,5.246-12.612v-35.714c0-1.042,0.334-1.897,1.004-2.567c0.67-0.669,1.525-1.004,2.567-1.004h7.143 c1.042,0,1.897,0.335,2.567,1.004C156.809,101.674,157.143,102.529,157.143,103.571z M200,7.143v57.143 c0,1.935-0.707,3.609-2.121,5.022c-1.413,1.414-3.088,2.121-5.021,2.121c-1.935,0-3.609-0.707-5.022-2.121l-19.644-19.643 l-72.767,72.769c-0.744,0.744-1.6,1.115-2.567,1.115s-1.823-0.371-2.567-1.115L77.567,109.71c-0.744-0.744-1.116-1.6-1.116-2.567 c0-0.967,0.372-1.822,1.116-2.566l72.768-72.768l-19.644-19.643c-1.413-1.414-2.12-3.088-2.12-5.022c0-1.935,0.707-3.609,2.12-5.022 C132.105,0.707,133.779,0,135.715,0h57.143c1.934,0,3.608,0.707,5.021,2.121C199.293,3.534,200,5.208,200,7.143z"/>
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
    elementStore.add(child);
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
        popOutActionElement.innerHTML = '<svg class="gitter-icon"><use xlink:href="#gitter-shape-external-link"></use></svg>';
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




