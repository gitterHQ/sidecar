// This is the entry point for the <script> tag window global friendly version: https://sidecar.gitter.im/
import objectAssign from 'object-assign';
import CustomEvent from './lib/custom-event-ponyfill';

import Chat from './lib/chat.js';

let getOrDefaultKey = function(obj, key) {
  return obj[key] || (function() {
    obj[key] = {};
    return obj[key];
  })();
};

let windowGitter = getOrDefaultKey(window, 'gitter');



let sidecar = {
  Chat
};

// Plop it on the `window`
objectAssign(windowGitter, sidecar);



// Tell them that `sidecar` is loaded and ready
let event = new CustomEvent('gitter-sidecar-ready', {
  detail: sidecar
});
document.dispatchEvent(event);



// Create the default instance
if(!((windowGitter.chat || {}).options || {}).disableDefaultChat) {
  let windowGitterChat = getOrDefaultKey(windowGitter, 'chat');
  windowGitterChat.defaultChat = new Chat(windowGitterChat.options || {});
}




export default sidecar;
