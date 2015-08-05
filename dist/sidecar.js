(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["sidecar"] = factory();
	else
		root["sidecar"] = factory();
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

	__webpack_require__(1);
	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _objectAssign = __webpack_require__(2);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	__webpack_require__(3);

	var concat = function concat() {
		return Array.prototype.slice.call(arguments).reduce(function (result, item) {
			// If array-like
			if (item.length && !Array.isArray(item)) {
				item = Array.prototype.slice.call(item);
			}

			return result.concat(item);
		}, []);
	};

	var embedGitterChat = function embedGitterChat(containers) {
		var iframe = document.createElement('iframe');
		//iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
		iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';

		containers.forEach(function (container) {
			container.appendChild(iframe);
		});
	};

	// containers: single or array of dom elements to add a chat to
	var gitterRemoteScript = function gitterRemoteScript(containers, options) {
		containers = containers ? concat(containers) : $('.gitter-chat-embed');

		var defaults = {
			room: 'gitterHQ/gitter',
			showChatByDefault: true,
			activationElement: null
		};

		var opts = (0, _objectAssign2['default'])({}, defaults, options);

		if (opts.showChatByDefault) {
			embedGitterChat(containers);
		} else {
			var button = document.createElement('a');
			button.href = opts.room;
			button.innerHTML = 'Open Chat';
			button.classList.add('gitter-open-chat-button');
			button.on('click', function (e) {
				// Stop the link from carrying us through to gitter
				e.preventDefault();

				embedGitterChat(containers);

				// Remove the button
				this.parentNode.removeChild(this);
			});

			document.body.appendChild(button);
		}
	};

	gitterRemoteScript($('.embed-gitter-chat-here'), {
		showChatByDefault: false
	});

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	"use strict";

	window.$ = document.querySelectorAll.bind(document);
	$.extend = jQuery.extend.bind(jQuery);

	Node.prototype.on = window.on = function (name, fn) {
		this.addEventListener(name, fn);
	};

	NodeList.prototype.__proto__ = Array.prototype;

	NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
		this.forEach(function (elem, i) {
			elem.on(name, fn);
		});
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function webpackUniversalModuleDefinition(root, factory) {
		if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define(factory);else if (typeof exports === 'object') exports["sidecar"] = factory();else root["sidecar"] = factory();
	})(undefined, function () {
		return (/******/(function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};

				/******/ // The require function
				/******/function __webpack_require__(moduleId) {

					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;

					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };

					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

					/******/ // Flag the module as loaded
					/******/module.loaded = true;

					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}

				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;

				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;

				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";

				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			})(
			/************************************************************************/
			/******/[
			/* 0 */
			function (module, exports, __webpack_require__) {

				__webpack_require__(1);
				__webpack_require__(1);
				module.exports = __webpack_require__(4);

				/***/
			},
			/* 1 */
			function (module, exports, __webpack_require__) {

				'use strict';

				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { 'default': obj };
				}

				var _objectAssign = __webpack_require__(2);

				var _objectAssign2 = _interopRequireDefault(_objectAssign);

				__webpack_require__(3);

				var concat = function concat() {
					return Array.prototype.slice.call(arguments).reduce(function (result, item) {
						// If array-like
						if (item.length && !Array.isArray(item)) {
							item = Array.prototype.slice.call(item);
						}

						return result.concat(item);
					}, []);
				};

				var embedGitterChat = function embedGitterChat(containers) {
					var iframe = document.createElement('iframe');
					//iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
					iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';

					containers.forEach(function (container) {
						container.appendChild(iframe);
					});
				};

				// containers: single or array of dom elements to add a chat to
				var gitterRemoteScript = function gitterRemoteScript(containers, options) {
					containers = containers ? concat(containers) : $('.gitter-chat-embed');

					var defaults = {
						room: 'gitterHQ/gitter',
						showChatByDefault: true,
						activationElement: null
					};

					var opts = (0, _objectAssign2['default'])({}, defaults, options);

					if (opts.showChatByDefault) {
						embedGitterChat(containers);
					} else {
						var button = document.createElement('a');
						button.href = opts.room;
						button.innerHTML = 'Open Chat';
						button.classList.add('gitter-open-chat-button');
						button.on('click', function (e) {
							// Stop the link from carrying us through to gitter
							e.preventDefault();

							embedGitterChat(containers);

							// Remove the button
							this.parentNode.removeChild(this);
						});

						document.body.appendChild(button);
					}
				};

				gitterRemoteScript($('.embed-gitter-chat-here'), {
					showChatByDefault: false
				});

				/***/
			},
			/* 2 */
			function (module, exports) {

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

				/***/
			},
			/* 3 */
			function (module, exports) {

				"use strict";

				window.$ = document.querySelectorAll.bind(document);
				$.extend = jQuery.extend.bind(jQuery);

				Node.prototype.on = window.on = function (name, fn) {
					this.addEventListener(name, fn);
				};

				NodeList.prototype.__proto__ = Array.prototype;

				NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
					this.forEach(function (elem, i) {
						elem.on(name, fn);
					});
				};

				/***/
			},
			/* 4 */
			function (module, exports, __webpack_require__) {

				'use strict';

				(function webpackUniversalModuleDefinition(root, factory) {
					if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define(factory);else if (typeof exports === 'object') exports["sidecar"] = factory();else root["sidecar"] = factory();
				})(undefined, function () {
					return (/******/(function (modules) {
							// webpackBootstrap
							/******/ // The module cache
							/******/var installedModules = {};

							/******/ // The require function
							/******/function __webpack_require__(moduleId) {

								/******/ // Check if module is in cache
								/******/if (installedModules[moduleId])
									/******/return installedModules[moduleId].exports;

								/******/ // Create a new module (and put it into the cache)
								/******/var module = installedModules[moduleId] = {
									/******/exports: {},
									/******/id: moduleId,
									/******/loaded: false
									/******/ };

								/******/ // Execute the module function
								/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

								/******/ // Flag the module as loaded
								/******/module.loaded = true;

								/******/ // Return the exports of the module
								/******/return module.exports;
								/******/
							}

							/******/ // expose the modules object (__webpack_modules__)
							/******/__webpack_require__.m = modules;

							/******/ // expose the module cache
							/******/__webpack_require__.c = installedModules;

							/******/ // __webpack_public_path__
							/******/__webpack_require__.p = "";

							/******/ // Load entry module and return exports
							/******/return __webpack_require__(0);
							/******/
						})(
						/************************************************************************/
						/******/[function (module, exports, __webpack_require__) {

							__webpack_require__(1);
							__webpack_require__(1);
							module.exports = __webpack_require__(4);

							/***/
						}, function (module, exports, __webpack_require__) {

							'use strict';

							function _interopRequireDefault(obj) {
								return obj && obj.__esModule ? obj : { 'default': obj };
							}

							var _objectAssign = __webpack_require__(2);

							var _objectAssign2 = _interopRequireDefault(_objectAssign);

							__webpack_require__(3);

							var concat = function concat() {
								return Array.prototype.slice.call(arguments).reduce(function (result, item) {
									// If array-like
									if (item.length && !Array.isArray(item)) {
										item = Array.prototype.slice.call(item);
									}

									return result.concat(item);
								}, []);
							};

							var embedGitterChat = function embedGitterChat(containers) {
								var iframe = document.createElement('iframe');
								//iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
								iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';

								containers.forEach(function (container) {
									container.appendChild(iframe);
								});
							};

							// containers: single or array of dom elements to add a chat to
							var gitterRemoteScript = function gitterRemoteScript(containers, options) {
								containers = containers ? concat(containers) : $('.gitter-chat-embed');

								var defaults = {
									room: 'gitterHQ/gitter',
									showChatByDefault: true,
									activationElement: null
								};

								var opts = (0, _objectAssign2['default'])({}, defaults, options);

								if (opts.showChatByDefault) {
									embedGitterChat(containers);
								} else {
									var button = document.createElement('a');
									button.href = opts.room;
									button.innerHTML = 'Open Chat';
									button.classList.add('gitter-open-chat-button');
									button.on('click', function (e) {
										// Stop the link from carrying us through to gitter
										e.preventDefault();

										embedGitterChat(containers);

										// Remove the button
										this.parentNode.removeChild(this);
									});

									document.body.appendChild(button);
								}
							};

							gitterRemoteScript($('.embed-gitter-chat-here'), {
								showChatByDefault: false
							});

							/***/
						}, function (module, exports) {

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

							/***/
						}, function (module, exports) {

							"use strict";

							window.$ = document.querySelectorAll.bind(document);
							$.extend = jQuery.extend.bind(jQuery);

							Node.prototype.on = window.on = function (name, fn) {
								this.addEventListener(name, fn);
							};

							NodeList.prototype.__proto__ = Array.prototype;

							NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
								this.forEach(function (elem, i) {
									elem.on(name, fn);
								});
							};

							/***/
						}, function (module, exports, __webpack_require__) {

							'use strict';

							(function webpackUniversalModuleDefinition(root, factory) {
								if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define(factory);else if (typeof exports === 'object') exports["sidecare"] = factory();else root["sidecare"] = factory();
							})(undefined, function () {
								return (/******/(function (modules) {
										// webpackBootstrap
										/******/ // The module cache
										/******/var installedModules = {};

										/******/ // The require function
										/******/function __webpack_require__(moduleId) {

											/******/ // Check if module is in cache
											/******/if (installedModules[moduleId])
												/******/return installedModules[moduleId].exports;

											/******/ // Create a new module (and put it into the cache)
											/******/var module = installedModules[moduleId] = {
												/******/exports: {},
												/******/id: moduleId,
												/******/loaded: false
												/******/ };

											/******/ // Execute the module function
											/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

											/******/ // Flag the module as loaded
											/******/module.loaded = true;

											/******/ // Return the exports of the module
											/******/return module.exports;
											/******/
										}

										/******/ // expose the modules object (__webpack_modules__)
										/******/__webpack_require__.m = modules;

										/******/ // expose the module cache
										/******/__webpack_require__.c = installedModules;

										/******/ // __webpack_public_path__
										/******/__webpack_require__.p = "";

										/******/ // Load entry module and return exports
										/******/return __webpack_require__(0);
										/******/
									})(
									/************************************************************************/
									[function (module, exports, __webpack_require__) {

										'use strict';

										function _interopRequireDefault(obj) {
											return obj && obj.__esModule ? obj : { 'default': obj };
										}

										var _objectAssign = __webpack_require__(1);

										var _objectAssign2 = _interopRequireDefault(_objectAssign);

										__webpack_require__(2);

										var concat = function concat() {
											return Array.prototype.slice.call(arguments).reduce(function (result, item) {
												// If array-like
												if (item.length && !Array.isArray(item)) {
													item = Array.prototype.slice.call(item);
												}

												return result.concat(item);
											}, []);
										};

										var embedGitterChat = function embedGitterChat(containers) {
											var iframe = document.createElement('iframe');
											//iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
											iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';

											containers.forEach(function (container) {
												container.appendChild(iframe);
											});
										};

										// containers: single or array of dom elements to add a chat to
										var gitterRemoteScript = function gitterRemoteScript(containers, options) {
											containers = containers ? concat(containers) : $('.gitter-chat-embed');

											var defaults = {
												room: 'gitterHQ/gitter',
												showChatByDefault: true,
												activationElement: null
											};

											var opts = (0, _objectAssign2['default'])({}, defaults, options);

											if (opts.showChatByDefault) {
												embedGitterChat(containers);
											} else {
												var button = document.createElement('a');
												button.href = opts.room;
												button.innerHTML = 'Open Chat';
												button.classList.add('gitter-open-chat-button');
												button.on('click', function (e) {
													// Stop the link from carrying us through to gitter
													e.preventDefault();

													embedGitterChat(containers);

													// Remove the button
													this.parentNode.removeChild(this);
												});

												document.body.appendChild(button);
											}
										};

										gitterRemoteScript($('.embed-gitter-chat-here'), {
											showChatByDefault: false
										});

										/***/
									}, function (module, exports) {

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

										/***/
									}, function (module, exports) {

										"use strict";

										window.$ = document.querySelectorAll.bind(document);
										$.extend = jQuery.extend.bind(jQuery);

										Node.prototype.on = window.on = function (name, fn) {
											this.addEventListener(name, fn);
										};

										NodeList.prototype.__proto__ = Array.prototype;

										NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
											this.forEach(function (elem, i) {
												elem.on(name, fn);
											});
										};

										/***/
									}
									/******/])
								);
							});
							;
							/***/ /***/ /***/

							/***/
						}
						/******/])
					);
				});
				;
				/***/ /***/ /***/ /***/ /***/
				/* 0 */

				/* 1 */

				/* 2 */

				/***/
			}
			/******/])
		);
	});
	;
	/***/ /***/ /***/ /***/ /***/
	/* 0 */

	/* 1 */

	/* 2 */

	/* 3 */

	/* 4 */
	/******/

/***/ }
/******/ ])
});
;