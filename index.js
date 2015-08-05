import objectAssign from 'object-assign';

import './lib/bling.js';



var concat = function() {
	return Array.prototype.slice.call(arguments).reduce(function(result, item) {
		// If array-like
		if(item.length && !Array.isArray(item)) {
			item = Array.prototype.slice.call(item);
		}
		
		return result.concat(item);
	}, []);
};

var embedGitterChat = function(containers) {
	var iframe = document.createElement('iframe');
	//iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
	iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';
	
	containers.forEach(function(container) {
		container.appendChild(iframe);
	});
};

// containers: single or array of dom elements to add a chat to
var gitterRemoteScript = function(containers, options) {
	containers = containers ? concat(containers) : $('.gitter-chat-embed');
	
	var defaults = {
		room: 'gitterHQ/gitter',
		showChatByDefault: true,
		activationElement: null
	};
	
	var opts = objectAssign({}, defaults, options);
	
	
	if(opts.showChatByDefault) {
		embedGitterChat(containers);
	}
	else {
		var button = document.createElement('a');
		button.href = opts.room;
		button.innerHTML = 'Open Chat';
		button.classList.add('gitter-open-chat-button');
		button.on('click', function(e) {
			// Stop the link from carrying us through to gitter
			e.preventDefault();
			
			embedGitterChat(containers);
			
			// Remove the button
			this.parentNode.removeChild(this);
			
		});
	
		document.body.appendChild(button);
	}
};



gitterRemoteScript($('.embed-gitter-chat-here'), {
	showChatByDefault: false
});










