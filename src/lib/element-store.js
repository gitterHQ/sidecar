import objectAssign from 'object-assign';

let remove = function(element) {
  element.parentElement.removeChild(element);
};


// An array-like storage container for DOM elements
class ElementStore extends Array {
  constructor(...elements) {
    // The array constructor doesn't assign the items to `this`
    // because can't be shimmed for built-in types
    super(...elements);
    objectAssign(this, elements || {});
  }

  // Because Array.prototype.concat isn't generic : http://www.2ality.com/2012/02/concat-not-generic.html
  concat(...args) {
    return new ElementStore(...(args.reduce((result, item) => {
      // If array-like
      if(item.length && !Array.isArray(item)) {
        item = Array.prototype.slice.call(item);
      }
      
      return result.concat(item);
    }, [])));
  }

  get length() {
    // We start at `-1` to cancel out the `+1` at the end if there are no items in the array-like
    return Object.keys(this).reduce((prevIndex, key) => {
      return Math.max(parseInt(key, 10), prevIndex);
    }, -1) + 1;
  }

  set length(newLength) {
    const currentLength = this.length;
    for(let i = newLength; i < currentLength; i++) {
      delete this[i];
    }
  }



  createElement(...args) {
    //console.log('create', args[0]);
    let element = document.createElement.apply(document, args);
    this.push(element);
    return element;
  }

  destroy() {
    this.forEach((element, index) => {
      console.log('el', index);
      remove(element);
      this.splice(index, 1);
    });
  }
}


export default ElementStore;
