

/*
const Calculator = require("./exportClass")
const cal = new Calculator()
//module exports
console.log(cal.multiply(1,3));
*/
/*
// exports shorthand
const { add } = require("./exportShortHand");
console.log(add(1,3));

//caching example
*/

/** 

// module caching 
//top level code won't run again and again
const cachedModule = require('./cachingTest')
console.log(cachedModule())
console.log(cachedModule())
console.log(cachedModule())

*/

//(function(exports, require, module, __fileName, __dirName){}) //module wrapper

// console.log(arguments);
// console.log(arguments);
console.log(require('module').wrapper)