import objectAssign from 'object-assign';
import {Promise} from 'es6-promise';

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

let gitterSvgSprites = `
	<svg class="gitter-hidden">
		<defs>
			<symbol id="gitter-shape-times-circle" viewBox="0 0 1792 1792">
				<path d="M1225 1079l-146 146q-10 10-23 10t-23-10l-137-137-137 137q-10 10-23 10t-23-10l-146-146q-10-10-10-23t10-23l137-137-137-137q-10-10-10-23t10-23l146-146q10-10 23-10t23 10l137 137 137-137q10-10 23-10t23 10l146 146q10 10 10 23t-10 23l-137 137 137 137q10 10 10 23t-10 23zm215-183q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/>
			</symbol>
			<symbol id="gitter-shape-external-link" viewBox="0 0 1792 1792">
				<path d="M1408 928v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45 45-19h512q26 0 45 19t19 45z"/>
			</symbol>
		</defs>
	</svg>`;

let embedGitterSvgSprites = function() {
	let elementStore = new ElementStore();

	let tempContainer = document.createElement('div');
	tempContainer.insertAdjacentHTML('beforeend', gitterSvgSprites);
	let body = $('body')[0];
	tempContainer.children.forEach(function(child) {
		body.appendChild(child);
		elementStore.push(child);
	});

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
		let containerOpts = getDataOptionsFromElement(opts, container);

		let iframe = elementStore.createElement('iframe');
		iframe.setAttribute('frameborder', '0');
		iframe.src = `https://gitter.im/${containerOpts.room}/~embed`;
		//iframe.src = `https://gitter.im/${containerOpts.room}/~chat`;

		container.appendChild(iframe);
	});

	return {
		containers,
		elementStore
	};
};




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
const CONTAINERS = Symbol();
const EMBEDCHATONCE = Symbol();
class chatEmbed {

	constructor(options = {}) {
		this[ELEMENTSTORE] = new ElementStore();
		
		this[DEFAULTS] = defaults;


		// Coerce into array of dom elements on what they pass in
		if(options.container) {
			options.container = coerceIntoElementsArray(options.container);
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
						// We use the option for the room, not pertaining to a particular container if set
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
			let embedResult = embedGitterChat(this[OPTIONS]);
			this[CONTAINERS] = embedResult.containers;
			this[ELEMENTSTORE] = this[ELEMENTSTORE].concat(embedResult.elementStore);


			this[CONTAINERS].forEach((container) => {
				let actionBar = this[ELEMENTSTORE].createElement('div');
				actionBar.classList.add('gitter-chat-embed-action-bar');

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
					let win = window.open(`https://gitter.im/${this[OPTIONS].room}`, '_blank');
					win.focus();

					e.preventDefault();
				});


				actionBar.appendChild(popOutActionElement);
				

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




