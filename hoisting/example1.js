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

function foo(a, b, c) {
    a++;
    b = 'new string';
    c['key'] = 'new value';
}
var a = 1, b = 'old string', c = { 'key': 'old value' };

foo(a, b, c);

console.log(a, b, c);

var myNumber = 42;
var myName = 'Wesley Chang';

// function swap(x, y) {
//     return [y, x];
// }

/**
 * This function takes in 2 parameters, creates a new TEMP variable to store one of the paramenters, and also creates an array. From there, the variables are swapped, so the TEMP var 'node' holds a reference to var 'a' that way the original var 'a' can reference var 'b'. And then var 'b' can reference the original var 'a'.
 * @param   a       [the first parameter you pass to the function]
 * @param   b       [the section parameter you pass to the function]
 * @return  array   [an array with both elements stored in it so that you can destructure it later]
 */
function swap(a, b) {
    var node = a, array = [];
    a = b;
    b = node;

    array.push(a);
    array.push(b);

    return array;
}

// Since you can only pass by value and not by reference, you have to destructure the returned array.
[myNumber, myName] = swap(myNumber, myName); // if you run this again, it'll go back to normal
console.log(myNumber, myName);
