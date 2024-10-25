const http = require('http');

const server  = http.createServer();

server.on('request', (req, res) => { // server is a instance of Event emmiter class 
    console.log('REQEST RECEIVED');
    console.log(req.url)
    res.end("request received")

})  
server.on('request', (req, res) => { // server is a instance of Event emmiter class 
    console.log('ANOTHER REQEST RECEIVED');

})

server.on('close', () => {
    console.log('Server closed')
})

server.listen(8000, "localhost", () => {
    console.log("waiting for the request.....")
});