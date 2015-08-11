
var $ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function(names, fn) {
	names.split(/\s/).forEach(function(name) {
		this.addEventListener(name, fn);
	}.bind(this));
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
	this.forEach(function(elem, i) {
		elem.on(name, fn);
	});
};



export default $;

