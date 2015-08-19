import objectAssign from 'object-assign';
import Promise from 'bluebird';

import $ from './bling.js';
import ElementStore from './element-store.js';
import chatCss from '../css/chat.css';



// This will concat anything including array-like things(like NodeLists)
let concat = function(...args) {
	return args.reduce(function(result, item) {
		// If array-like
		if(item.length && !Array.isArray(item)) {
			item = Array.prototype.slice.call(item);
		}
		
		return result.concat(item);
	}, []);
};

// Pass in a selector string, dom node, or array of dom nodes
let coerceIntoElementsArray = function(stuff) {
	let elements = [];
	if(typeof stuff === 'string') {
		elements = $(stuff);
	}
	else {
		elements = concat(stuff);
	}

	return elements;
};


// Helper method that detects whether an element was "activated"
// Accibility in mind: click, spacebar, enter
const spacebarKey = 32;
const enterKey = 13;
let elementOnActivate = function(elements, cb) {
	elements = coerceIntoElementsArray(elements);
	NodeList.prototype.on.call(elements, 'click keydown', function(e, ...args) {
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


let embedGitterChat = function(opts) {
	let elementStore = new ElementStore();

	let containers = coerceIntoElementsArray(opts.container || (() => {
		let container = elementStore.createElement('aside');
		container.classList.add('gitter-chat-embed');
		document.body.appendChild(container);

		return container;
	})());

	containers.forEach((container) => {
		let iframe = elementStore.createElement('iframe');
		iframe.setAttribute('frameborder', '0');
		iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
		//iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';

		container.appendChild(iframe);
	});

	return {
		containers,
		elementStore
	};
};


// Keep some stuff behind symbols so people "can't" access the private data
const OPTS = Symbol();
const ELEMENTSTORE = Symbol();
const INIT = Symbol();
const CONTAINERS = Symbol();
const EMBEDCHATONCE = Symbol();
class chatEmbed {

	constructor(options = {}) {
		this[ELEMENTSTORE] = new ElementStore();
		

		let defaults = {
			room: 'gitterHQ/gitter',
			// container: single or array of dom elements, or string selector to embed chat in
			container: null,

			// Whether to show the chat embed when the page loads
			showChatByDefault: false,
			// The button element used to activate when the chat gets shown on the page
			// Can be a dom node or a promise that optionally resolves to a dom node
			// Note: Only applies if `options.showChatByDefault` is `false`
			activation: null,
			// Whether to preload the gitter chat iframe.
			// We preload the chat so there isn't any jank when the chat opens
			preload: true,

			// Whether to embed a `<style>` tag with some pre-made CSS
			useStyles: true,
			// TODO: implement layouts (see todo.md)
			//	 - `fixed`
			//	 - `off-canvas`
			//	 - `flex-aside`
			layout: 'fixed'

			//showLeftMenu: false
		};

		// Coerce into array of dom elements on what they pass in
		if(options.container) {
			options.container = coerceIntoElementsArray(options.container);
		}
		
		this[OPTS] = objectAssign({}, defaults, options);

		this[INIT]();
	}

	[INIT]() {
		let opts = this[OPTS];

		if(opts.useStyles) {
			this[ELEMENTSTORE] = this[ELEMENTSTORE].concat(embedGitterStyles());
		}

		if(opts.preload) {
			this.toggleChat(false);
		}

		if(opts.showChatByDefault) {
			this.toggleChat(true);
		}
		else {
			Promise.resolve(opts.activation)
				.then((activationElement) => {
					activationElement = coerceIntoElementsArray(activationElement || (() => {
						let button = this[ELEMENTSTORE].createElement('button');
						button.href = opts.room;
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

					this[CONTAINERS].forEach((container) => {
						container.on('gitter-chat-toggle', (e) => {
							let isChatOpen = e.detail.state;
							// Toggle the visibiltiy of the activation element
							// so it is only there when the the chat is closed
							activationElement.forEach((element) => {
								element.classList.toggle('is-collapsed', isChatOpen);
							});
						});
					});
				});
		}
	}

	[EMBEDCHATONCE]() {
		if(!this[CONTAINERS]) {
			let embedResult = embedGitterChat(this[OPTS]);
			this[CONTAINERS] = embedResult.containers;
			this[ELEMENTSTORE] = this[ELEMENTSTORE].concat(embedResult.elementStore);


			this[CONTAINERS].forEach((container) => {
				let actionBar = this[ELEMENTSTORE].createElement('div');
				actionBar.classList.add('gitter-chat-embed-action-bar');

				container.insertBefore(actionBar, container.firstChild);

				let collapseActionElement = this[ELEMENTSTORE].createElement('button');
				collapseActionElement.classList.add('gitter-chat-embed-action-bar-item');
				collapseActionElement.setAttribute('aria-label', 'Collapse Gitter Chat');
				elementOnActivate(collapseActionElement, (e) => {
					// Hide the chat
					this.toggleChat(false);

					e.preventDefault();
				});

				actionBar.appendChild(collapseActionElement);

				let collapseActionContentElement = this[ELEMENTSTORE].createElement('div');
				collapseActionContentElement.classList.add('gitter-chat-embed-action-bar-item-content');
				collapseActionContentElement.innerHTML = '-';

				collapseActionElement.appendChild(collapseActionContentElement);
			});

		}
	}


	// Public API
	toggleChat(state) {
		this[EMBEDCHATONCE]();
		if(!this[CONTAINERS]) {
			console.warn('Gitter Sidecar: No chat embed elements to toggle visibility on');
		}

		coerceIntoElementsArray(this[CONTAINERS]).forEach(function(container) {
			container.classList.toggle('is-collapsed', !state);

			let event = new CustomEvent('gitter-chat-toggle', {
				detail: {
					state
				}
			});
			container.dispatchEvent(event);
		});
	}

	destroy() {
		this[ELEMENTSTORE].destroy();
	}
}






export default chatEmbed;




