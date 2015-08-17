import objectAssign from 'object-assign';

import Chat from './lib/chat.js';

let getOrDefaultKey = function(obj, key) {
	return obj[key] || (function() {
		obj[key] = {};
		return obj[key];
	})();
};

let windowGitter = getOrDefaultKey(window, '___gitter');

if(!((windowGitter.chat || {}).options || {}).disableDefaultChat) {
	let windowGitterChat = getOrDefaultKey(windowGitter, 'chat');
	windowGitterChat.defaultChat = new Chat(windowGitterChat.options || {});
}





let sidecar = {
	Chat
};

// Plop it on the window
objectAssign(windowGitter, sidecar);

export default sidecar;
