
# v0.2.11 - 2015-9-28

 - Microsite visual tweaks and updates

# v0.2.9 - 2015-9-20

 - Add `microsite/` to showcase Sidecar and some getting started goodness
 - Change `options.container` to `options.targetElement`
 - Change `optionts.activation` to `options.activationElement`

# v0.2.5 - 2015-9-2

 - Listen to `.js-gitter-toggle-chat-button` elements for "activiation"(click) which can toggle the chat panel. You can also set `data-gitter-toggle-chat-state` to an explicit value of `true` or `false` to make a open and close button respectively. By default the value is `'toggle'`.
 - Add `dom-utility.js -> off` to remove event handlers


# v0.2.4 - 2015-9-1

 - Emit `gitter-sidecar-ready` event on `document` when the script has loaded: `document.addEventListener('gitter-sidecar-ready', function(e) { var Chat = e.detail.Chat; var chat = new Chat(/*opts*/); });`
 - Emit `gitter-sidecar-instance-started` event on `document` after a Sidecar chat instance is initialized: `document.addEventListener('gitter-sidecar-instance-started', function(e) { var chat = e.detail.chat; chat.toggleChat(true); });`
 - Emit `gitter-chat-started` event on container after a Sidecar chat instance is initialized: `document.querySelector('.gitter-chat-embed').addEventListener('gitter-chat-started', function(e) { var chat = e.detail.chat; chat.toggleChat(true); });`
 - Use [`es6-promise`](https://www.npmjs.com/package/es6-promise) instead of [`bluebird`](https://github.com/petkaantonov/bluebird) for the sake of file size
 - Stop using `bling.js` for DOM manipulation. Now using `dom-utility.js` which is fully encapsulated from the `window` world.
 - Now using `window.gitter` instead of `window.___gitter`


# v0.2.3 - 2015-8-31

 - `options.preload` defaults to `false`. Instead, we load the iframe after the "Open Chat" button is clicked and the aside is slid into place. This is to avoid the unnecessary strain to the Gitter servers for people who never click the open chat button, etc.
 - Add `.is-loading` state for when the iframe hasn't embedded yet but we are working on it. We don't add the iframe exactly on click because that causes jank in the slide in animation.


# v0.2.2 - 2015-8-27

 - `options.room` defaults to `undefined` and will throw an error if no room is specified
 - Using a custom PostCSS plugin and [`postcss-plugin-context`](https://github.com/postcss/postcss-plugin-context) to add `box-sizing: border-box;` to each rule: `@context border-box { /* ... */ }
 - Use `<a>` element as the default generated activation element so that if the JS fails to execute, we still have it link through to the actual room.


# v0.2.1 - 2015-8-20

 - Update basic example(cosmetic)
 - Add `popout` action button that opens the room in a new tab.
 - Update snippets for setting options on the `window` object so it properly deep sets properties
 - Proper immutable default options property


# v0.2.0 - 2015-8-16

 - Now using `window.___gitter.chat.options` instead of `window.___gitterEmbedConfig`
 - Add `window.___gitter.chat.options.disableDefaultChat` to stop the default chat from just loading on the page when including the Sidecar script
 - Add `gitter.Chat.destroy` to clean up any elements created by the embed
 - Add `gitter.Chat.toggleChat` to toggle visibility between chat window and activation element
 - Add `options.preload` for whether the chat iframe should be loaded on page load
 - Change `options.activationElement` to `options.activation` which can be a dom element, promise, or a promise that resolves to a dom element.
 - Emit `gitter-chat-toggle` event on chat panel container element
 - Using symbols to make internal state and methods "private"

# v0.1.1 - 2015-8-11

 - Document options in Readme
 	 - Add `options.container`
 	 - Add `options.useStyles`
 - Add keyboard support
 - Add `/examples/` showing off different setups


# v0.1.0 - 2015-8-5

 - Initial release

