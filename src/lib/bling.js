
let $ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function(names, fn) {
  names.split(/\s/).forEach(function(name) {
    this.addEventListener(name, fn);
  }.bind(this));

  // Keep the chaining going
  return this;
};

HTMLCollection.prototype.__proto__ = Array.prototype;
NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
  this.forEach(function(elem) {
    elem.on(name, fn);
  });

  // Keep the chaining going
  return this;
};



export default $;

