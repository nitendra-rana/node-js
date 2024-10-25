const fs = require('fs');
const crypto = require("crypto");

const start = Date.now()

process.env.UV_THREADPOOL_SIZE = 0;//(by default is 4);// it can be max upto 1024 but good to keep it low.
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(( ) => console.log("Immediate 1 finished"));

fs.readFile("event-loop.txt", ()=> {
    console.log("I/O finished");
    console.log("----------")
    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(( ) => console.log("Immediate 2 finished"));
    process.nextTick(() => console.log("Process.nextTick"))//Runs after each phase 
/* Async code */
    crypto.pbkdf2('password', 'salt', 100000, 1024,'sha512', () => {
        console.log(Date.now() - start,"Password encrypted 1");
    } )
    crypto.pbkdf2('password', 'salt', 100000, 1024,'sha512', () => {
        console.log(Date.now() - start,"Password encrypted 2");
    } )
    crypto.pbkdf2('password', 'salt', 100000, 1024,'sha512', () => {
        console.log(Date.now() - start,"Password encrypted 3");
    } )
    crypto.pbkdf2('password', 'salt', 100000, 1024,'sha512', () => {
        console.log(Date.now() - start,"Password encrypted 4");
    } )
/* */
/* this is sync code and blocks the threads of execution *
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024,'sha512', )
    console.log(Date.now() - start,"Password encrypted 1");

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024,'sha512', )
    console.log(Date.now() - start,"Password encrypted 2");

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024,'sha512', )
    console.log(Date.now() - start,"Password encrypted 3");

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024,'sha512', )
    console.log(Date.now() - start,"Password encrypted 4");

 /*    */
})

console.log("Hello from the top level code")
