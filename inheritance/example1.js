/**
 * JavaScript objects only have one construct, objects. Each object has an internal link to another object called its Prototype. This Prototype object has a Prototype of its own, and so on until an object is reached with a null as its Prototype.
 * - this is called the Prototype chain
 *
 * Extending natice prototypes: this is considered bad practice and breaks encapsulation. The only good reason for extending a built-in prototype is to backport the features of newer JavaScript engines.
 */

String.prototype.repeatify = String.prototype.repeatify || function(times) {
    var string = '';
    for (var i = 0; i < times; i++) {
        string += this;
    }

    return string;
}

console.log('Hello'.repeatify(5));
