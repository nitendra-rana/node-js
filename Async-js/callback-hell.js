const fs = require('fs');
const superAgent = require('superagent');
const filename = `dog.txt`;

fs.readFile(`${__dirname}/${filename}`, 'utf8', (err, data) => {
  console.log('Breed: ', data);
  superAgent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err);
      fs.writeFile(filename, res.body.message, (err) => {
        console.log('write error', err);
      });
    });
});
