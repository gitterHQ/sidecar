window.$ = document.querySelectorAll.bind(document);
$.extend = jQuery.extend.bind(jQuery);

Node.prototype.on = window.on = function (name, fn) {
	this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
	this.forEach(function(elem, i) {
		elem.on(name, fn);
	});
};
