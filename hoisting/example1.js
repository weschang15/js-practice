/**
 * Hoisting: the general way of thinking about how creation and execution phases work in JavaScript.
 */

function catName(name) {
    console.log('My cat\'s name is ' + name);
}
catName('Bam');

dogName('Scarlet');
function dogName(name) {
    console.log('My dog\'s name is ' + name);
}

/**
 * JavaScript only hoists declarations, not initializations. If the variable is declared and initialized after using it, the value will be undefined.
 */

var x = 1;
console.log(x + ' ' + y);
var y = 2;
// This will throw an undefined error because 'y' is initialized after being called.

function test() {
    console.log(a);
    console.log(foo());

    var a = 1;
    function foo() {
        return 2;
    }
}

test();
// Flow: undefined, 2 because 'a' is initialized after being called, and invoaking a function before it is defined is valid
