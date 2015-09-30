# Sidecar

Gitter embed widget

# Latest version: 0.2.12

### [Changelog](https://github.com/gitterHQ/sidecar/blob/master/CHANGELOG.md)


# Usage

```html
<div class="gitter-chat-embed"></div>
<script src="sidecar.js"></script>
```

# [API](https://github.com/gitterHQ/sidecar/blob/master/API.md)



# Build

Build the sidecar library, output path: `./dist/sidecar.js`

`npm run build`

### Dev

Same as `devbuild` but also watches the directory and rebuilds on any file changes

`npm run devbuild`

### Microsite

`npm run build-microsite`

This is currently a work in progress. But I hope to have `react-hot-loader` and `webpack-dev-server` working for this:

`npm run devbuild-microsite`

### Testing

You'll need a BrowserStack username and key, exported as `BS_USER` and `BS_KEY` respectively.

`npm test`

### Deployment

You'll need AWS credentials exported as `AWS_KEY` and `AWS_SECRET`. This command is not meant to be run locally, only by the CircleCI deployment step (on every tag).

`npm run deploy`
