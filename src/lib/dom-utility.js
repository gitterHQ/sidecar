
let $ = document.querySelectorAll.bind(document);



// This will concat anything including array-like things(like NodeLists)
let concat = function(...args) {
  return args.reduce(function(result, item) {
    // If array-like
    if(item && item.length && !Array.isArray(item)) {
      item = Array.prototype.slice.call(item);
    }
    
    return result.concat(item);
  }, []);
};

// Pass in a selector string, dom node, or array of dom nodes
export function coerceIntoElementsArray(stuff) {
  let elements = [];
  if(typeof stuff === 'string') {
    elements = $(stuff);
  }
  else {
    elements = concat(stuff);
  }

  return elements;
};


// `arrayLike` can be a single object, array, or array-like (NodeList, HTMLCollection)
export function forEach(arrayLike, cb) {
  concat(arrayLike).forEach((...args) => {
    if(cb) {
      cb.apply(cb, args);
    }
  });
};

// Listen to events.
// Pass in a string name of events separated by spaces
export function on(elements, names, cb) {
  names.split(/\s/).forEach(function(name) {
    forEach(elements, (element) => {
      element.addEventListener(name, cb);
    });
  });

  // Keep the chaining going
  return this;
};



export default $;


