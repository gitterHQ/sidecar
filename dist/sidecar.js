(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["sidecare"] = factory();
	else
		root["sidecare"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _objectAssign = __webpack_require__(1);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _libBlingJs = __webpack_require__(2);

	var _libBlingJs2 = _interopRequireDefault(_libBlingJs);

	var concat = function concat() {
		return Array.prototype.slice.call(arguments).reduce(function (result, item) {
			// If array-like
			if (item.length && !Array.isArray(item)) {
				item = Array.prototype.slice.call(item);
			}

			return result.concat(item);
		}, []);
	};

	var embedGitterStyles = function embedGitterStyles() {
		var style = document.createElement('style');

		var gitterEmbedStyles = '\n\t\t.gitter-chat-embed iframe {\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\n\t\t\tborder: 0;\n\t\t}\n\n\t\t.gitter-open-chat-button {\n\t\t\tposition: fixed;\n\t\t\tbottom: 0;\n\t\t\tright: 10px;\n\t\t\t\n\t\t\tpadding: 1em 3em;\n\t\t\t\n\t\t\tbackground-color: #36bc98;\n\t\t\tborder: 0;\n\t\t\tborder-top-left-radius: 0.5em;\n\t\t\tborder-top-right-radius: 0.5em;\n\t\t\t\n\t\t\tcolor: #ffffff;\n\t\t\ttext-align: center;\n\t\t\ttext-decoration: none;\n\n\t\t\tcursor: pointer;\n\t\t\tcursor: hand;\n\t\t\t\n\t\t\ttransition: background-color 0.3s ease;\n\t\t}\n\n\t\t.gitter-open-chat-button:hover,\n\t\t.gitter-open-chat-button:focus {\n\t\t\tbackground-color: #3ea07f;\n\t\t}\n\t\t.gitter-open-chat-button:focus {\n\t\t\tbox-shadow: 0 0 8px rgba(62, 160, 127, 0.6);\n\n\t\t\toutline: none;\n\t\t}\n\t\t';

		style.innerHTML = gitterEmbedStyles;
		(0, _libBlingJs2['default'])('head')[0].appendChild(style);
	};

	var embedGitterChat = function embedGitterChat(containers) {
		containers.forEach(function (container) {
			var iframe = document.createElement('iframe');
			iframe.setAttribute('frameborder', '0');
			iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
			//iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';

			container.appendChild(iframe);
		});
	};

	// containers: single or array of dom elements, or string selector to embed chat in
	var gitterRemoteScript = function gitterRemoteScript(options) {

		var defaults = {
			room: 'gitterHQ/gitter',
			container: (0, _libBlingJs2['default'])('.gitter-chat-embed'),
			showChatByDefault: true,
			activationElement: null,
			useStyles: true

			//showLeftMenu: false
		};

		// Fix up the containers depending on what they pass in
		if (options && options.container) {
			if (typeof options.container === 'string') {
				options.container = (0, _libBlingJs2['default'])(options.container);
			} else {
				options.container = concat(options.container);
			}
		}

		var opts = (0, _objectAssign2['default'])({}, defaults, options);

		console.log(opts);

		var embed = function embed() {
			embedGitterChat(opts.container);
		};

		if (opts.useStyles) {
			embedGitterStyles();
		}

		if (opts.showChatByDefault) {
			embed();
		} else {
			var button = document.createElement('button');
			button.href = opts.room;
			button.innerHTML = 'Open Chat';
			button.classList.add('gitter-open-chat-button');
			button.on('click keydown', function (e) {
				console.log('asdf');
				// If click or spacebar, or enter is pressed
				if (e.type === 'click' || e.type === 'keydown' && (e.keyCode === 32 || e.keyCode === 13)) {
					// Embed the chat
					embed();
					// Remove the button
					button.parentNode.removeChild(button);

					e.preventDefault();
				}
			});

			document.body.appendChild(button);
		}
	};

	gitterRemoteScript(window.___gitterEmbedConfig || {});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var $ = document.querySelectorAll.bind(document);

	Node.prototype.on = window.on = function (names, fn) {
		names.split(/\s/).forEach((function (name) {
			this.addEventListener(name, fn);
		}).bind(this));
	};

	NodeList.prototype.__proto__ = Array.prototype;

	NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
		this.forEach(function (elem, i) {
			elem.on(name, fn);
		});
	};

	exports["default"] = $;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;