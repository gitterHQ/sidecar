# Sidecar

Gitter embed widget

# Latest version: 0.2.1

### [Changelog](https://github.com/gitterHQ/sidecar/blob/master/CHANGELOG.md)


# Usage

```html
<div class="gitter-chat-embed"></div>
<script src="sidecar.js"></script>
```

## Examples

 - [Basic](https://github.com/gitterHQ/sidecar/tree/master/examples/basic)


# Options

Set options with the global window option:

```html
<script>
	((window.___gitter = {}).chat = {}).options = {
		room: 'gitterHQ/gitter'
	};
</script>
```

You can also override these options individually on the container:

```html
<div
	class="gitter-chat-embed
	data-room="gitterHQ/gitter"
></div>
```


 - `options.room`: 
 	 - Default: `gitterHQ/gitter`
 - `options.container`: Where you want to embed the chat. Can accept a dom node, array of dom nodes, or a selector
 	 - Default: Elements that match `'.gitter-chat-embed'`
 - `options.showChatByDefault`: Whether to embed the chat on page load(true) or wait until the `options.activation` is resolved/clicked/interacted with(false).
 	 - Default: `true`
 	 - Note: **Use with caution,** useful for use cases where you have a page dedicated to chat.
 - `options.activation`: If `options.showChatByDefault` is `false`, this is the element you have to click/interact with to get the chat to actually embed. You can also pass in a promise which can optionally resolve to a dom node
 	 - Default: `null`
 - `options.useStyles`: Whether to embed some pre-made CSS styles to the page
 	 - Default: `true`


### Window Options:

You can set any of the chat options above in this object as well

 - `window.___gitter.chat.options.disableDefaultChat`: Stop the default chat from just loading on the page when including the Sidecar script. *So you can handle the Gitter chat creation yourself.*

The default chat is stored on `window.___gitter.chat.defaultChat`.


# API

## `gitter.Chat`


```js
var chat = new window.gitter.Chat(/* options */);`
```

 - `toggleChat(isChatOpen)`: Function/method - Takes a boolean which toggles the visibility of the chat panel
 - `destroy()`: Function/method - Clean-up and remove any elements created by the embed


## Events

 - `gitter-chat-toggle`: Emitted whenever the chat is opened or closed
 	 - Data: `state`: Whether it was opened(true) or closed(false)


*example:*
```js
document.querySelector('.gitter-chat-embed').addEventListener('gitter-chat-toggle', function(e) {
	console.log(e.detail.state ? 'Chat Opened' : 'Chat Closed');
});
```



# Build

Build the sidecar library, output path: `./dist/sidecar.js`

`npm run build-standalone`

### Dev

Same as `build-standalone` but also watches the directory and rebuilds on any file changes

`npm run build-standalone-dev`