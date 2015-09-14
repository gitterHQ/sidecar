import 'whatwg-fetch';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import marked from 'marked';

import MicrositeApp from './components/MicrositeApp';
import micrositeAppReducer from './reducers/MicrositeReducer';


import readmeMarkdown from 'raw!../../../README.md';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  smartLists: true
});



let store = createStore(micrositeAppReducer, {
  roomName: '',
  documentation: marked(readmeMarkdown)
});

React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    {() => <MicrositeApp />}
  </Provider>,
  document.querySelector('.microsite-app-entry-point')
);
