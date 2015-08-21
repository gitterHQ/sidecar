

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

