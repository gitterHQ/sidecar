/*!
 * Gitter Sidecar v0.2.17
 * https://sidecar.gitter.im/
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sidecar"] = factory();
	else
		root["sidecar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _objectAssign = __webpack_require__(1);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _libChatJs = __webpack_require__(2);
	
	var _libChatJs2 = _interopRequireDefault(_libChatJs);
	
	var getOrDefaultKey = function getOrDefaultKey(obj, key) {
	  return obj[key] || (function () {
	    obj[key] = {};
	    return obj[key];
	  })();
	};
	
	var windowGitter = getOrDefaultKey(window, 'gitter');
	
	var sidecar = {
	  Chat: _libChatJs2['default']
	};
	
	// Plop it on the `window`
	(0, _objectAssign2['default'])(windowGitter, sidecar);
	
	// Tell them that `sidecar` is loaded and ready
	var event = new CustomEvent('gitter-sidecar-ready', {
	  detail: sidecar
	});
	document.dispatchEvent(event);
	
	// Create the default instance
	if (!((windowGitter.chat || {}).options || {}).disableDefaultChat) {
	  var windowGitterChat = getOrDefaultKey(windowGitter, 'chat');
	  windowGitterChat.defaultChat = new _libChatJs2['default'](windowGitterChat.options || {});
	}
	
	exports['default'] = sidecar;
	module.exports = exports['default'];

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _objectAssign = __webpack_require__(1);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _es6Promise = __webpack_require__(3);
	
	//import Promise from 'bluebird';
	
	var _elementStoreJs = __webpack_require__(8);
	
	var _elementStoreJs2 = _interopRequireDefault(_elementStoreJs);
	
	var _cssChatCss = __webpack_require__(9);
	
	var _cssChatCss2 = _interopRequireDefault(_cssChatCss);
	
	var _domUtilityJs = __webpack_require__(11);
	
	var _domUtilityJs2 = _interopRequireDefault(_domUtilityJs);
	
	var domUtility = _interopRequireWildcard(_domUtilityJs);
	
	var parseAttributeTruthiness = function parseAttributeTruthiness(value) {
	  if (value) {
	    var valueSanitized = value.trim().toLowerCase();
	    if (valueSanitized === 'true' || valueSanitized === '1') {
	      return true;
	    } else if (valueSanitized === 'false' || valueSanitized === '0') {
	      return false;
	    }
	  }
	
	  return value;
	};
	
	// Pass in a shape object of options and the element
	// and we will extend and properties available
	// NOTE: We will only look for keys present in `options` passed in
	var getDataOptionsFromElement = function getDataOptionsFromElement(options, element) {
	  if (!element) {
	    return options;
	  }
	
	  var newOptions = {};
	  Object.keys(options).forEach(function (optionKey) {
	    var attr = 'data-' + optionKey;
	    if (element.hasAttribute(attr)) {
	      var optionValue = element.getAttribute(attr);
	      newOptions[optionKey] = optionValue;
	    }
	  });
	
	  return (0, _objectAssign2['default'])({}, options, newOptions);
	};
	
	// Helper method that detects whether an element was "activated"
	// Returns a function that you can execute to remove the listeners
	// Accibility in mind: click, spacebar, enter
	var spacebarKey = 32;
	var enterKey = 13;
	var elementOnActivate = function elementOnActivate(elements, cb) {
	  elements = (0, _domUtilityJs2['default'])(elements);
	
	  var handler = function handler(e) {
	    // If click or spacebar, or enter is pressed
	    if (e.type === 'click' || e.type === 'keydown' && (e.keyCode === spacebarKey || e.keyCode === enterKey)) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      cb.call.apply(cb, [this, e].concat(args));
	    }
	  };
	  domUtility.on(elements, 'click keydown', handler);
	
	  return function () {
	    domUtility.off(elements, 'click keydown', handler);
	  };
	};
	
	var embedGitterStyles = function embedGitterStyles() {
	  var elementStore = new _elementStoreJs2['default']();
	
	  var style = elementStore.createElement('style');
	  style.innerHTML = _cssChatCss2['default'];
	  (0, _domUtilityJs2['default'])('head')[0].appendChild(style);
	
	  return elementStore;
	};
	
	var gitterSvgSprites = '\n  <svg class="gitter-hidden">\n    <defs>\n      <symbol id="gitter-shape-times-circle" viewBox="0 0 171.429 171.429">\n        <path d="M122.433,106.138l-16.295,16.295c-0.744,0.744-1.6,1.116-2.566,1.116c-0.968,0-1.823-0.372-2.567-1.116l-15.29-15.29 l-15.29,15.29c-0.744,0.744-1.6,1.116-2.567,1.116s-1.823-0.372-2.567-1.116l-16.294-16.295c-0.744-0.744-1.116-1.6-1.116-2.566 c0-0.968,0.372-1.823,1.116-2.567l15.29-15.29l-15.29-15.29c-0.744-0.744-1.116-1.6-1.116-2.567s0.372-1.823,1.116-2.567 L65.29,48.996c0.744-0.744,1.6-1.116,2.567-1.116s1.823,0.372,2.567,1.116l15.29,15.29l15.29-15.29 c0.744-0.744,1.6-1.116,2.567-1.116c0.967,0,1.822,0.372,2.566,1.116l16.295,16.294c0.744,0.744,1.116,1.6,1.116,2.567 s-0.372,1.823-1.116,2.567l-15.29,15.29l15.29,15.29c0.744,0.744,1.116,1.6,1.116,2.567 C123.549,104.539,123.177,105.394,122.433,106.138z M146.429,85.714c0-11.012-2.717-21.168-8.148-30.469 s-12.797-16.667-22.098-22.098S96.726,25,85.714,25s-21.168,2.716-30.469,8.147S38.579,45.945,33.147,55.246S25,74.703,25,85.714 s2.716,21.168,8.147,30.469s12.797,16.666,22.098,22.098s19.457,8.148,30.469,8.148s21.168-2.717,30.469-8.148 s16.666-12.797,22.098-22.098S146.429,96.726,146.429,85.714z M171.429,85.714c0,15.551-3.832,29.893-11.496,43.024 c-7.664,13.133-18.062,23.53-31.194,31.194c-13.132,7.664-27.474,11.496-43.024,11.496s-29.892-3.832-43.024-11.496 c-13.133-7.664-23.531-18.062-31.194-31.194C3.832,115.607,0,101.265,0,85.714S3.832,55.822,11.496,42.69 c7.664-13.133,18.062-23.531,31.194-31.194C55.822,3.832,70.164,0,85.714,0s29.893,3.832,43.024,11.496 c13.133,7.664,23.53,18.062,31.194,31.194C167.597,55.822,171.429,70.164,171.429,85.714z"/>\n      </symbol>\n      <symbol id="gitter-shape-external-link" viewBox="0 0 200 171.429">\n        <path d="M157.143,103.571v35.714c0,8.854-3.144,16.426-9.431,22.713s-13.858,9.431-22.712,9.431H32.143 c-8.854,0-16.425-3.144-22.712-9.431S0,148.14,0,139.285V46.429c0-8.854,3.144-16.425,9.431-22.712 c6.287-6.287,13.858-9.431,22.712-9.431h78.572c1.041,0,1.896,0.335,2.566,1.004c0.67,0.67,1.004,1.525,1.004,2.567V25 c0,1.042-0.334,1.897-1.004,2.567c-0.67,0.67-1.525,1.004-2.566,1.004H32.143c-4.911,0-9.115,1.749-12.612,5.246 s-5.246,7.701-5.246,12.612v92.856c0,4.911,1.749,9.115,5.246,12.612s7.701,5.245,12.612,5.245H125c4.91,0,9.115-1.748,12.611-5.245 c3.497-3.497,5.246-7.701,5.246-12.612v-35.714c0-1.042,0.334-1.897,1.004-2.567c0.67-0.669,1.525-1.004,2.567-1.004h7.143 c1.042,0,1.897,0.335,2.567,1.004C156.809,101.674,157.143,102.529,157.143,103.571z M200,7.143v57.143 c0,1.935-0.707,3.609-2.121,5.022c-1.413,1.414-3.088,2.121-5.021,2.121c-1.935,0-3.609-0.707-5.022-2.121l-19.644-19.643 l-72.767,72.769c-0.744,0.744-1.6,1.115-2.567,1.115s-1.823-0.371-2.567-1.115L77.567,109.71c-0.744-0.744-1.116-1.6-1.116-2.567 c0-0.967,0.372-1.822,1.116-2.566l72.768-72.768l-19.644-19.643c-1.413-1.414-2.12-3.088-2.12-5.022c0-1.935,0.707-3.609,2.12-5.022 C132.105,0.707,133.779,0,135.715,0h57.143c1.934,0,3.608,0.707,5.021,2.121C199.293,3.534,200,5.208,200,7.143z"/>\n      </symbol>\n      <symbol id="gitter-shape-spinner" viewBox="0 0 1792 1792">\n        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"/>\n      </symbol>\n    </defs>\n  </svg>\n';
	
	var embedGitterSvgSprites = function embedGitterSvgSprites() {
	  var elementStore = new _elementStoreJs2['default']();
	
	  var tempContainer = document.createElement('div');
	  tempContainer.insertAdjacentHTML('beforeend', gitterSvgSprites);
	  var body = (0, _domUtilityJs2['default'])('body')[0];
	  domUtility.forEach(tempContainer.children, function (child) {
	    body.appendChild(child);
	    elementStore.add(child);
	  });
	
	  return elementStore;
	};
	
	var embedGitterChat = function embedGitterChat(opts) {
	  var elementStore = new _elementStoreJs2['default']();
	
	  var targetElements = opts.targetElement;
	
	  targetElements.forEach(function (targetElement) {
	    var targetElementOpts = getDataOptionsFromElement(opts, targetElement);
	
	    if (targetElementOpts.room) {
	      var iframe = elementStore.createElement('iframe');
	      iframe.setAttribute('frameborder', '0');
	      iframe.src = '' + opts.host + targetElementOpts.room + '/~embed';
	      //iframe.src = `${opts.host}${targetElementOpts.room}/~chat`;
	
	      targetElement.appendChild(iframe);
	    } else {
	      console.error('Gitter Sidecar: No room specified for targetElement', targetElement);
	    }
	  });
	
	  return elementStore;
	};
	
	var defaults = {
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
	var DEFAULTS = Symbol();
	var OPTIONS = Symbol();
	var ELEMENTSTORE = Symbol();
	var EVENTHANDLESTORE = Symbol();
	var INIT = Symbol();
	var ISEMBEDDED = Symbol();
	var EMBEDCHATONCE = Symbol();
	var TOGGLETARGETELEMENTS = Symbol();
	
	var chatEmbed = (function () {
	  function chatEmbed() {
	    var _this = this;
	
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, chatEmbed);
	
	    this[ELEMENTSTORE] = new _elementStoreJs2['default']();
	    this[EVENTHANDLESTORE] = [];
	
	    this[DEFAULTS] = (0, _objectAssign2['default'])({}, defaults);
	
	    // Coerce into array of dom elements on what they pass in
	    if (options.targetElement) {
	      options.targetElementr = (0, _domUtilityJs2['default'])(options.targetElement);
	    }
	    // Otherwise create our own default targetElement
	    else {
	        this[DEFAULTS].targetElement = (0, _domUtilityJs2['default'])((function () {
	          var targetElement = _this[ELEMENTSTORE].createElement('aside');
	          targetElement.classList.add('gitter-chat-embed');
	          // Start out collapsed
	          targetElement.classList.add('is-collapsed');
	          document.body.appendChild(targetElement);
	
	          return targetElement;
	        })());
	      }
	
	    this[OPTIONS] = (0, _objectAssign2['default'])({}, this[DEFAULTS], options);
	
	    this[INIT]();
	  }
	
	  _createClass(chatEmbed, [{
	    key: INIT,
	    value: function value() {
	      var _this2 = this;
	
	      var opts = this[OPTIONS];
	
	      if (opts.useStyles) {
	        this[ELEMENTSTORE].add(embedGitterStyles());
	        this[ELEMENTSTORE].add(embedGitterSvgSprites());
	      }
	
	      var targetElements = opts.targetElement;
	      targetElements.forEach(function (targetElement) {
	        var loadingIndicatorElement = _this2[ELEMENTSTORE].createElement('div');
	        loadingIndicatorElement.classList.add('gitter-chat-embed-loading-wrapper');
	        loadingIndicatorElement.innerHTML = '\n        <svg class="gitter-chat-embed-loading-indicator gitter-icon"><use xlink:href="#gitter-shape-spinner"></use></svg>\n      ';
	
	        // Prepend
	        targetElement.insertBefore(loadingIndicatorElement, targetElement.firstChild);
	      });
	
	      if (opts.preload) {
	        this.toggleChat(false);
	      }
	
	      if (opts.showChatByDefault) {
	        this.toggleChat(true);
	      } else {
	        _es6Promise.Promise.resolve(opts.activationElement).then(function (activationElement) {
	          activationElement = (0, _domUtilityJs2['default'])(activationElement || (function () {
	            var button = _this2[ELEMENTSTORE].createElement('a');
	            // We use the option for the room (not pertaining to a particular targetElement attribute if set)
	            button.href = '' + opts.host + opts.room;
	            button.innerHTML = 'Open Chat';
	            button.classList.add('gitter-open-chat-button');
	            document.body.appendChild(button);
	
	            return button;
	          })());
	
	          elementOnActivate(activationElement, function (e) {
	            // Show the chat
	            _this2.toggleChat(true);
	
	            e.preventDefault();
	          });
	
	          opts.targetElement.forEach(function (targetElement) {
	            domUtility.on(targetElement, 'gitter-chat-toggle', function (e) {
	              var isChatOpen = e.detail.state;
	              // Toggle the visibiltiy of the activation element
	              // so it is only there when the the chat is closed
	              domUtility.forEach(activationElement, function (element) {
	                element.classList.toggle('is-collapsed', isChatOpen);
	              });
	            });
	          });
	        });
	      }
	
	      // Listen to buttons with a class of `.js-gitter-toggle-chat-button`
	      // We also look for an options `data-gitter-toggle-chat-state` attribute
	      var classToggleButtonOff = elementOnActivate((0, _domUtilityJs2['default'])('.js-gitter-toggle-chat-button'), function (e) {
	        var state = parseAttributeTruthiness(e.target.getAttribute('data-gitter-toggle-chat-state'));
	        _this2.toggleChat(state !== null ? state : 'toggle');
	
	        e.preventDefault();
	      });
	      this[EVENTHANDLESTORE].push(classToggleButtonOff);
	
	      // Emit for each targetElement
	      opts.targetElement.forEach(function (targetElement) {
	        var event = new CustomEvent('gitter-chat-started', {
	          detail: {
	            chat: _this2
	          }
	        });
	        targetElement.dispatchEvent(event);
	      });
	
	      // Emit for document
	      var documentEvent = new CustomEvent('gitter-sidecar-instance-started', {
	        detail: {
	          chat: this
	        }
	      });
	      document.dispatchEvent(documentEvent);
	    }
	  }, {
	    key: EMBEDCHATONCE,
	    value: function value() {
	      var _this3 = this;
	
	      if (!this[ISEMBEDDED]) {
	        (function () {
	          var opts = _this3[OPTIONS];
	
	          var embedResult = embedGitterChat(_this3[OPTIONS]);
	          _this3[ELEMENTSTORE].add(embedResult);
	
	          var targetElements = opts.targetElement;
	          targetElements.forEach(function (targetElement) {
	            var actionBar = _this3[ELEMENTSTORE].createElement('div');
	            actionBar.classList.add('gitter-chat-embed-action-bar');
	
	            // Prepend
	            targetElement.insertBefore(actionBar, targetElement.firstChild);
	
	            var popOutActionElement = _this3[ELEMENTSTORE].createElement('button');
	            popOutActionElement.classList.add('gitter-chat-embed-action-bar-item');
	            popOutActionElement.classList.add('gitter-chat-embed-action-bar-item-pop-out');
	            popOutActionElement.setAttribute('aria-label', 'Open Chat in Gitter.im');
	            popOutActionElement.innerHTML = '<svg class="gitter-icon"><use xlink:href="#gitter-shape-external-link"></use></svg>';
	            elementOnActivate(popOutActionElement, function (e) {
	              // Hide the chat
	              _this3.toggleChat(false);
	
	              // Open in new tab
	              var win = window.open('' + opts.host + _this3[OPTIONS].room, '_blank');
	              win.focus();
	
	              e.preventDefault();
	            });
	
	            actionBar.appendChild(popOutActionElement);
	
	            var collapseActionElement = _this3[ELEMENTSTORE].createElement('button');
	            collapseActionElement.classList.add('gitter-chat-embed-action-bar-item');
	            collapseActionElement.setAttribute('aria-label', 'Collapse Gitter Chat');
	            collapseActionElement.innerHTML = '<svg class="gitter-icon"><use xlink:href="#gitter-shape-times-circle"></use></svg>';
	            elementOnActivate(collapseActionElement, function (e) {
	              // Hide the chat
	              _this3.toggleChat(false);
	
	              e.preventDefault();
	            });
	
	            actionBar.appendChild(collapseActionElement);
	          });
	        })();
	      }
	
	      this[ISEMBEDDED] = true;
	    }
	
	    // state: true, false, 'toggle'
	  }, {
	    key: TOGGLETARGETELEMENTS,
	    value: function value(state) {
	      var opts = this[OPTIONS];
	
	      if (!opts.targetElement) {
	        console.warn('Gitter Sidecar: No chat embed elements to toggle visibility on');
	      }
	
	      var targetElements = opts.targetElement;
	      targetElements.forEach(function (targetElement) {
	        var wasCollapseClassAdded = undefined;
	        if (state === 'toggle') {
	          wasCollapseClassAdded = targetElement.classList.toggle('is-collapsed');
	        } else {
	          wasCollapseClassAdded = targetElement.classList.toggle('is-collapsed', !state);
	        }
	
	        // This is what happened after toggling the classes from the `state` input passed in
	        var actualState = !wasCollapseClassAdded;
	
	        var event = new CustomEvent('gitter-chat-toggle', {
	          detail: {
	            state: actualState
	          }
	        });
	        targetElement.dispatchEvent(event);
	      });
	    }
	
	    // Public API
	    // state: true, false, 'toggle'
	  }, {
	    key: 'toggleChat',
	    value: function toggleChat(state) {
	      var _this4 = this;
	
	      var opts = this[OPTIONS];
	
	      // We delay the embed to make sure the animation can go jank free
	      // if it isn't already embedded
	      if (state && !this[ISEMBEDDED]) {
	        (function () {
	          var targetElements = opts.targetElement;
	          // Start the loading spinner
	          targetElements.forEach(function (targetElement) {
	            targetElement.classList.add('is-loading');
	          });
	
	          setTimeout(function () {
	            _this4[EMBEDCHATONCE]();
	            _this4[TOGGLETARGETELEMENTS](state);
	
	            // Remove the loading spinner
	            targetElements.forEach(function (targetElement) {
	              targetElement.classList.remove('is-loading');
	            });
	          }, 300 /* TODO change to transition/animation end, see for robust transition/animation end code: https://github.com/MadLittleMods/jquery-carouselss */);
	        })();
	      }
	      // But we still want people to embed no matter what state :)
	      // For example `options.preload`, should load the chat but not show it
	      else {
	          this[EMBEDCHATONCE]();
	          this[TOGGLETARGETELEMENTS](state);
	        }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Remove all the event handlers
	      this[EVENTHANDLESTORE].forEach(function (fn) {
	        fn();
	      });
	
	      //console.log(this[ELEMENTSTORE]);
	      // Remove and DOM elements, we made
	      this[ELEMENTSTORE].destroy();
	    }
	  }]);
	
	  return chatEmbed;
	})();
	
	exports['default'] = chatEmbed;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(6);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);
	
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;
	
	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;
	
	        enumerator._init();
	
	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };
	
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;
	
	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;
	
	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }
	
	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	    var lib$es6$promise$promise$$counter = 0;
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }
	
	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }
	
	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;
	
	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }
	
	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;
	
	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }
	
	        return child;
	      },
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(7)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }()), __webpack_require__(5)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _objectAssign = __webpack_require__(1);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var remove = function remove(element) {
	  if (element) {
	    element.parentElement.removeChild(element);
	  }
	};
	
	var ElementStore = (function () {
	  function ElementStore() {
	    _classCallCheck(this, ElementStore);
	
	    this.elements = [];
	  }
	
	  _createClass(ElementStore, [{
	    key: 'createElement',
	    value: function createElement() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var element = document.createElement.apply(document, args);
	      this.add(element);
	      return element;
	    }
	  }, {
	    key: 'add',
	    value: function add() {
	      for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        elements[_key2] = arguments[_key2];
	      }
	
	      var flattenedElements = [].concat(elements).reduce(function (prevResult, element) {
	        if (element) {
	          // If it is a store, flatten it out into us
	          if (element instanceof ElementStore) {
	            return prevResult.concat(element.elements);
	          }
	
	          return prevResult.concat(element);
	        }
	
	        return prevResult;
	      }, []);
	
	      this.elements = this.elements.concat(flattenedElements);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.elements.forEach(function (element) {
	        return remove(element);
	      });
	      this.elements = [];
	    }
	  }]);
	
	  return ElementStore;
	})();
	
	exports['default'] = ElementStore;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".gitter-hidden{box-sizing:border-box;display:none}.gitter-icon{box-sizing:border-box;width:22px;height:22px;fill:currentColor}.gitter-chat-embed{box-sizing:border-box;z-index:100;position:fixed;top:0;left:60%;bottom:0;right:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;background-color:#fff;border-left:1px solid #333;box-shadow:-12px 0 18px 0 rgba(50,50,50,.3);-webkit-transition:-webkit-transform .3s cubic-bezier(.16,.22,.22,1.7);transition:transform .3s cubic-bezier(.16,.22,.22,1.7)}@context border-box{.gitter-chat-embed{box-sizing:border-box;background-color:#fff}}.gitter-chat-embed.is-collapsed:not(.is-loading){box-sizing:border-box;-webkit-transform:translateX(110%);-ms-transform:translateX(110%);transform:translateX(110%)}.gitter-chat-embed:after{box-sizing:border-box;content:'';z-index:-1;position:absolute;top:0;left:100%;bottom:0;right:-100%;background-color:#fff}@context border-box{.gitter-chat-embed:after{box-sizing:border-box;background-color:#fff}}@media(max-width:1150px){.gitter-chat-embed{box-sizing:border-box;left:45%}}@media(max-width:944px){.gitter-chat-embed{box-sizing:border-box;left:30%}}@media(max-width:600px){.gitter-chat-embed{box-sizing:border-box;left:15%}}@media(max-width:500px){.gitter-chat-embed{box-sizing:border-box;left:0}}.gitter-chat-embed>iframe{box-sizing:border-box;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%;height:100%;border:0}.gitter-chat-embed-loading-wrapper{box-sizing:border-box;position:absolute;top:0;left:0;bottom:0;right:0;display:none;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.is-loading .gitter-chat-embed-loading-wrapper{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.gitter-chat-embed-loading-indicator{box-sizing:border-box;color:rgba(0,0,0,.75);-webkit-animation:spin 2s infinite linear;animation:spin 2s infinite linear}@-webkit-keyframes spin{from{box-sizing:border-box;-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{box-sizing:border-box;-webkit-transform:rotate(359.9deg);transform:rotate(359.9deg)}}@keyframes spin{from{box-sizing:border-box;-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{box-sizing:border-box;-webkit-transform:rotate(359.9deg);transform:rotate(359.9deg)}}.gitter-chat-embed-action-bar{box-sizing:border-box;position:absolute;top:0;left:0;right:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;padding-bottom:.7em;background:-webkit-linear-gradient(top,#fff 0,#fff 50%,rgba(255,255,255,0) 100%);background:linear-gradient(to bottom,#fff 0,#fff 50%,rgba(255,255,255,0) 100%)}.gitter-chat-embed-action-bar-item{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:40px;padding-top:0;padding-left:12px;padding-bottom:0;padding-right:12px;background:none;border:0;color:#3a3133;color:rgba(58,49,51,.65);font-size:48px;font-weight:700;cursor:pointer;cursor:hand;-webkit-transition:all .2s ease;transition:all .2s ease}.gitter-chat-embed-action-bar-item:hover,.gitter-chat-embed-action-bar-item:focus{box-sizing:border-box;outline:none;color:#3a3133}.gitter-chat-embed-action-bar-item:active{box-sizing:border-box;color:#f68d42}.gitter-chat-embed-action-bar-item-pop-out .gitter-icon{box-sizing:border-box;margin-right:-4px}.gitter-open-chat-button{box-sizing:border-box;z-index:100;position:fixed;bottom:0;right:10px;padding:1em 3em;background-color:#36bc98;border:0;border-top-left-radius:.5em;border-top-right-radius:.5em;color:#fff;font-family:sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;text-align:center;text-decoration:none;cursor:pointer;cursor:hand;-webkit-transition:all .3s ease;transition:all .3s ease}.gitter-open-chat-button:visited{box-sizing:border-box;color:#fff}.gitter-open-chat-button:hover,.gitter-open-chat-button:focus{box-sizing:border-box;background-color:#3ea07f;color:#fff}.gitter-open-chat-button:focus{box-sizing:border-box;box-shadow:0 0 8px rgba(62,160,127,.6);outline:none}.gitter-open-chat-button:active{box-sizing:border-box;color:#eee}.gitter-open-chat-button.is-collapsed{box-sizing:border-box;-webkit-transform:translateY(120%);-ms-transform:translateY(120%);transform:translateY(120%)}", ""]);
	
	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	// DOM Utility
	// https://gist.github.com/MadLittleMods/f71b0ef905832b8c16c9
	//
	// Inspired by bling.js: https://gist.github.com/paulirish/12fb951a8b893a454b32
	// But we needed full module encapsulation
	
	// This will concat anything including array-like things(like NodeLists or HTMLCollections)
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.forEach = forEach;
	exports.on = on;
	exports.off = off;
	var concat = function concat() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  return args.reduce(function (result, item) {
	    // If array-like
	    if (item && item.length !== undefined && !Array.isArray(item) && (
	    // The window object acts as an array of the iframes in the document (undesired effects for our use cases)
	    !window || window && !(item instanceof window.constructor))) {
	      item = Array.prototype.slice.call(item);
	    }
	
	    return result.concat(item);
	  }, []);
	};
	
	// Pass in a selector string, dom node, or array of dom nodes
	var coerceIntoElementsArray = function coerceIntoElementsArray() {
	  var elements = [];
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  if (typeof args[0] === 'string') {
	    var _document$querySelectorAll;
	
	    elements = (_document$querySelectorAll = document.querySelectorAll).call.apply(_document$querySelectorAll, [document].concat(args));
	  } else {
	    elements = concat.apply(undefined, args);
	  }
	
	  return elements;
	};
	
	// `arrayLike` can be a single object, array, or array-like (NodeList, HTMLCollection)
	
	function forEach(arrayLike, cb) {
	  concat(arrayLike).forEach(function () {
	    if (cb) {
	      cb.apply(undefined, arguments);
	    }
	  });
	
	  // Keep the chaining going
	  return this;
	}
	
	// Listen to events.
	// Pass in a string name of events separated by spaces
	
	function on(elements, names, cb) {
	  names.split(/\s/).forEach(function (name) {
	    forEach(elements, function (element) {
	      element.addEventListener(name, cb);
	    });
	  });
	
	  // Keep the chaining going
	  return this;
	}
	
	// Remove the event listener
	// Pass in a string name of events separated by spaces
	
	function off(elements, names, cb) {
	  names.split(/\s/).forEach(function (name) {
	    forEach(elements, function (element) {
	      element.removeEventListener(name, cb);
	    });
	  });
	
	  // Keep the chaining going
	  return this;
	}
	
	var $ = function $() {
	  return coerceIntoElementsArray.apply(undefined, arguments);
	};
	
	exports['default'] = $;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sidecar.js.map