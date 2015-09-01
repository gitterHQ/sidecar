import objectAssign from 'object-assign';
import {Promise} from 'es6-promise';

import ElementStore from './element-store.js';
import chatCss from '../css/chat.css';


import { default as $ } from './dom-utility.js';
import * as domUtility from './dom-utility.js';



const gitterUrl = 'https://gitter.im/';


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
// Accibility in mind: click, spacebar, enter
const spacebarKey = 32;
const enterKey = 13;
let elementOnActivate = function(elements, cb) {
  elements = domUtility.coerceIntoElementsArray(elements);
  domUtility.on(elements, 'click keydown', function(e, ...args) {
    // If click or spacebar, or enter is pressed
    if(e.type === 'click' || (e.type === 'keydown' && (e.keyCode === spacebarKey || e.keyCode === enterKey))) {
      cb.call(this, e, ...args);
    }
  });
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

  let containers = opts.container;

  containers.forEach((container) => {
    let containerOpts = getDataOptionsFromElement(opts, container);

    if(containerOpts.room) {
      let iframe = elementStore.createElement('iframe');
      iframe.setAttribute('frameborder', '0');
      iframe.src = `${gitterUrl}${containerOpts.room}/~embed`;
      //iframe.src = `${gitterUrl}${containerOpts.room}/~chat`;

      container.appendChild(iframe);
    }
    else {
      console.error('Gitter Sidecar: No room specified for container', container);
    }

  });

  return elementStore;
};




let defaults = {
  room: undefined,
  // container: single or array of dom elements, or string selector to embed chat in
  container: null,

  // Whether to show the chat embed when the page loads
  // Note: Use with caution, useful for use cases where you have a page dedicated to chat.
  showChatByDefault: false,
  // The button element used to activate when the chat gets shown on the page
  // Can be a dom node or a promise that optionally resolves to a dom node
  // Note: Only applies if `options.showChatByDefault` is `false`
  activation: null,
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
// Make the defaults a little more immutable
Object.keys(defaults).forEach((key) => {
  Object.defineProperty(defaults, key, {
    value: defaults[key],
    writable: false,
    configurable: false
  });
});


// Keep some stuff behind symbols so people "can't" access the private data
const DEFAULTS = Symbol();
const OPTIONS = Symbol();
const ELEMENTSTORE = Symbol();
const INIT = Symbol();
const ISEMBEDDED = Symbol();
const EMBEDCHATONCE = Symbol();
const TOGGLECONTAINERS = Symbol();

class chatEmbed {
  constructor(options = {}) {
    this[ELEMENTSTORE] = new ElementStore();
    
    this[DEFAULTS] = objectAssign({}, defaults);

    // Coerce into array of dom elements on what they pass in
    if(options.container) {
      options.container = domUtility.coerceIntoElementsArray(options.container);
    }
    // Otherwise create our own default container
    else {
      this[DEFAULTS].container = domUtility.coerceIntoElementsArray((() => {
        let container = this[ELEMENTSTORE].createElement('aside');
        container.classList.add('gitter-chat-embed');
        // Start out collapsed
        container.classList.add('is-collapsed');
        document.body.appendChild(container);

        return container;
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

    let containers = opts.container;
    containers.forEach((container) => {
      let loadingIndicatorElement = this[ELEMENTSTORE].createElement('div');
      loadingIndicatorElement.classList.add('gitter-chat-embed-loading-wrapper');
      loadingIndicatorElement.innerHTML = `
        <svg class=" gitter-chat-embed-loading-indicator gitter-icon"><use xlink:href="#gitter-shape-spinner"></use></svg>
      `;

      // Prepend
      container.insertBefore(loadingIndicatorElement, container.firstChild);
    });

    if(opts.preload) {
      this.toggleChat(false);
    }

    if(opts.showChatByDefault) {
      this.toggleChat(true);
    }
    else {
      Promise.resolve(opts.activation)
        .then((activationElement) => {
          activationElement = domUtility.coerceIntoElementsArray(activationElement || (() => {
            let button = this[ELEMENTSTORE].createElement('a');
            // We use the option for the room, not pertaining to a particular container if set
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

          opts.container.forEach((container) => {
            domUtility.on(container, 'gitter-chat-toggle', (e) => {
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


    // Emit for each container
    opts.container.forEach((container) => {
      let event = new CustomEvent('gitter-chat-started', {
        detail: {
          chat: this
        }
      });
      container.dispatchEvent(event);
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

      let containers = opts.container;
      containers.forEach((container) => {
        let actionBar = this[ELEMENTSTORE].createElement('div');
        actionBar.classList.add('gitter-chat-embed-action-bar');

        // Prepend
        container.insertBefore(actionBar, container.firstChild);

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

        let popOutActionElement = this[ELEMENTSTORE].createElement('button');
        popOutActionElement.classList.add('gitter-chat-embed-action-bar-item');
        popOutActionElement.setAttribute('aria-label', 'Collapse Gitter Chat');
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
        

      });
    }

    this[ISEMBEDDED] = true;
  }

  [TOGGLECONTAINERS](state) {
    let opts = this[OPTIONS];

    if(!opts.container) {
      console.warn('Gitter Sidecar: No chat embed elements to toggle visibility on');
    }

    let containers = opts.container;
    containers.forEach((container) => {
      container.classList.toggle('is-collapsed', !state);

      let event = new CustomEvent('gitter-chat-toggle', {
        detail: {
          state
        }
      });
      container.dispatchEvent(event);
    });
  }


  // Public API
  toggleChat(state) {
    let opts = this[OPTIONS];

    // We delay the embed to make sure the animation can go jank free
    // if it isn't already embedded
    if(state && !this[ISEMBEDDED]) {
      let containers = opts.container;
      // Start the loading spinner
      containers.forEach((container) => {
        container.classList.add('is-loading');
      });

      setTimeout(() => {
        this[EMBEDCHATONCE]();
        this[TOGGLECONTAINERS](state);

        // Remove the loading spinner
        containers.forEach((container) => {
          container.classList.remove('is-loading');
        });
      }, 300/* TODO change to transition/animation end, see for robust transition/animation end code: https://github.com/MadLittleMods/jquery-carouselss */);
    }
    // But we still want people to embed no matter what state :)
    // For example `options.preload`, should load the chat but not show it
    else {
      this[EMBEDCHATONCE]();
      this[TOGGLECONTAINERS](state);
    }
  }

  destroy() {
    this[ELEMENTSTORE].destroy();
  }
}






export default chatEmbed;




