[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gitterHQ/sidecar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# Sidecar

Gitter embed widget

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


# Build Microsite

`npm run build-microsite`

### Dev

This is currently a work in progress. But I hope to have `react-hot-loader` and `webpack-dev-server` working for this:

`npm run devbuild-microsite`


# Deploy: Push Release

We have CircleCI setup, the config is in `circle.yml`.

To push a new version of the sidecar script, run the following:

 - `npm version patch`: bump version and tag it
 - `git push --tags`: Trigger CircleCI build

To push a new release of microsite, just push to the `master` branch


## Manual Deployment

You'll need AWS credentials exported as `AWS_KEY` and `AWS_SECRET`. This command is not meant to be run locally, only by the CircleCI deployment step (on every tag).

`npm run deploy`



# Testing

You'll need a BrowserStack username and key, exported as `BS_USER` and `BS_KEY` respectively.

`npm test`
