/*
event loop :
new http request => callback picked up by event loop =>offloads more expensive task to threadpool
Timer expired =>                ''                  =>              ''
finished file reading =>        ''                  =>              ''


1. all the application code that is inside callback functions(non-top-level code)
2. node.js is build around callback functions 
3. event driven architectre:
    a. events are emitted 
    b. events loop picks them up
    c. callback called

4. event loop does orchestration



//phases
1      start
        ||
2.   Expired timer callback
        ||
3.  
*/