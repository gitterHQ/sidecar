import objectAssign from 'object-assign';

import $ from './lib/bling.js';



var concat = function() {
	return Array.prototype.slice.call(arguments).reduce(function(result, item) {
		// If array-like
		if(item.length && !Array.isArray(item)) {
			item = Array.prototype.slice.call(item);
		}
		
		return result.concat(item);
	}, []);
};


var embedGitterStyles = function() {
	var style = document.createElement('style');

	var gitterEmbedStyles = `
		.gitter-chat-embed iframe {
			width: 100%;
			height: 100%;

			border: 0;
		}

		.gitter-open-chat-button {
			position: fixed;
			bottom: 0;
			right: 10px;
			
			padding: 1em 3em;
			
			background-color: #36bc98;
			border: 0;
			border-top-left-radius: 0.5em;
			border-top-right-radius: 0.5em;
			
			color: #ffffff;
			text-align: center;
			text-decoration: none;

			cursor: pointer;
			cursor: hand;
			
			transition: background-color 0.3s ease;
		}

		.gitter-open-chat-button:hover,
		.gitter-open-chat-button:focus {
			background-color: #3ea07f;
		}
		.gitter-open-chat-button:focus {
			box-shadow: 0 0 8px rgba(62, 160, 127, 0.6);

			outline: none;
		}
		`;

	style.innerHTML = gitterEmbedStyles;
	$('head')[0].appendChild(style);
};


var embedGitterChat = function(containers) {
	containers.forEach(function(container) {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('frameborder', '0');
		iframe.src = 'https://gitter.im/gitterHQ/gitter/~embed';
		//iframe.src = 'https://gitter.im/gitterHQ/gitter/~chat';

		container.appendChild(iframe);
	});
};

// containers: single or array of dom elements, or string selector to embed chat in
var gitterRemoteScript = function(options) {

	var defaults = {
		room: 'gitterHQ/gitter',
		container: $('.gitter-chat-embed'),
		showChatByDefault: true,
		activationElement: null,
		useStyles: true

		//showLeftMenu: false
	};

	// Fix up the containers depending on what they pass in
	if(options && options.container) {
		if(typeof options.container === 'string') {
			options.container = $(options.container);
		}
		else {
			options.container = concat(options.container);
		}
	}
	
	var opts = objectAssign({}, defaults, options);

	console.log(opts);

	var embed = () => {
		embedGitterChat(opts.container);
	};
	
	if(opts.useStyles) {
		embedGitterStyles();
	}

	if(opts.showChatByDefault) {
		embed();
	}
	else {
		var button = document.createElement('button');
		button.href = opts.room;
		button.innerHTML = 'Open Chat';
		button.classList.add('gitter-open-chat-button');
		button.on('click keydown', (e) => {
			console.log('asdf');
			// If click or spacebar, or enter is pressed
			if(e.type === 'click' || (e.type === 'keydown' && (e.keyCode === 32 || e.keyCode === 13))) {
				// Embed the chat
				embed();
				// Remove the button
				button.parentNode.removeChild(button);

				e.preventDefault();
			}
			
		});
	
		document.body.appendChild(button);
	}
};



gitterRemoteScript(window.___gitterEmbedConfig || {});









