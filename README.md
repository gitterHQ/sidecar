# Sidecar

Gitter embed widget

# Latest version: 0.1.1

### [Changelog](https://github.com/gitterHQ/sidecar/blob/master/CHANGELOG.md)


# Usage

```html
<div class="gitter-chat-embed"></div>
<script src="sidecar.js"></script>
```

# Options

 - `options.room`: 
 	 - Default: `'gitterHQ/gitter'`
 - `options.container`: Where you want to embed the chat
 	 - Default: Elements that match `'.gitter-chat-embed'`
 - `options.showChatByDefault`: Whether to embed the chat on page load(true) or wait until the `options.activationElement` is clicked/interacted with(false).
 	 - Default: `true`
 - `options.activationElement`: If `options.showChatByDefault` is false, this is the element you have to click/interact with to get the chat to actually embed.
 	 - Default: `null`
 - `options.useStyles`: Whether to embed some pre-made CSS styles to the page
 	 - Default: `true`


# Build

Build the sidecar library, output path: `./dist/sidecar.js`

`npm run build-standalone`

### Dev

Same as `build-standalone` but alos watches the directory and rebuilds on any file changes

`npm run build-standalone-dev`