const fs = require('fs');
const server = require('http').createServer();
/* */
const filePathTest = 'large-file-test.txt';
server.on('request', (req, res) => {
  //solution 1 direct read
  //   fs.readFile(filePathTest, (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //solution 2 streams
  //   const readable = fs.createReadStream(filePathTest);
  //   readable.on('data', (chunk) => {
  //     console.log('chunk passed');
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => {
  //     // waits for end event to fire.
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found');
  //   });
  //solution 3 Avoid backpressure using pipe operator

  const readablePipe = fs.createReadStream(filePathTest);
  readablePipe.pipe(res);
  //readableSource.pipe(writableDestination)
});

server.listen(8000, 'localhost', () => {
  console.log('waiting for a request .....');
});
/* */

/* *
//creating a large file with same text==> 
const filePath = 'large-file-test.txt'
const repeatTime = 10 // change it 100000 for testing
const content = '=> This is a large file of 100000 lines to test streams\n'.repeat(10);
fs.writeFile(filePath,content, (err, data) => {
    if (err) console.log(err);
    console.log("write complete..!")
  });
 /* */
