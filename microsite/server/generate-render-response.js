import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
let readFile = Promise.promisify(fs.readFile);

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import marked from 'marked';

import renderFullPage from './render-full-page';
import getLatestSidecarVersion from './get-latest-sidecar-version';

import App from '../src/js/components/MicrositeApp';
import appReducer from '../src/js/reducers/MicrositeReducer';


const documentationMarkdownFilePath = path.join(__dirname, '../../API.md');
const getDocumentationMarkdown = readFile(documentationMarkdownFilePath).then(function(buffer) {
    return String(buffer);
  });

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  smartLists: true
});

// We are going to fill these out in the sections to follow
export default function generateRenderResponse(req) {
  return getDocumentationMarkdown.then((readmeMarkdown) => {

    // Create a new Redux store instance
    const store = createStore(appReducer, {
      documentation: marked(readmeMarkdown),
      sidecarVersion: getLatestSidecarVersion()
    });

    // Render the component to a string
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Grab the initial state from our Redux store
    const initialState = store.getState();

    return renderFullPage(html, initialState);
  });
}
