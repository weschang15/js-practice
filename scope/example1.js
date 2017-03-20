/**
 *  Scope: variables declared inside of a function can only be accessed from within that function.
 *
 * Local variables
 *  - when a variable is declared inside of a function (function-level, local scope, function-level scope)
 *  - the js interpreter creates these variables when the function is run then removes them
 *  - this means that if the function runs twice, the variable can have different values
 *
 * Global variables
 *  - when a variable is declared outside of a function (global, global scope)
 *  - these variables can be used in any function declared
 *  - they are also stored in memory for as long as the web page is loaded (which means it uses more memory)
 */

(function() {
    var a = b = 5;
})();

// the variable 'a' is declared with the keyword var inside of a IIFE. Which means it's locally scoped. However, 'b' is not declared with the keyword var. It is only assigned to the variable 'a' which means it's a global variable

console.log(b);
