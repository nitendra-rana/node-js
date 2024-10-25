const EventEmitter = require('events');
const { inherits } = require('util');

/* 
    const myEmitter = new EventEmitter(); // we can do this but this is not the best practice 
*/
// using class 
class Calculator extends EventEmitter {
    constructor(){
        super();
    }
}

const myEmitter = new Calculator();


myEmitter.on('resultCalculated' , (firstNo,secondNo,result) => {
    console.log(`The addition of ${firstNo}, ${secondNo} is ${result}`);
})


const addNumbers = (firstNo, secondNo) => {
    const result = firstNo + secondNo;
    myEmitter.emit('resultCalculated', firstNo, secondNo, result);
}

addNumbers(5, 7);