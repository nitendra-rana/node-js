const fs = require('fs');
const superAgent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject("couldn't find file the file.");
      resolve(data);
    });
  });
};
const writeFilePromise = (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if (err) reject("couldn't find file the file.");
      resolve('File updated successfuly.');
    });
  });
};
const writeFilename = `dog-images.txt`;
const readFilename = `dog.txt`;

readFilePromise(`${__dirname}/${readFilename}`)
  .then((data) => {
    superAgent
      .get(`https://dog.ceo/api/breed/${data}/images/random`)
      .then((res) => {
        writeFilePromise(writeFilename, res.body.message)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.error(err));
        console.warn(res.body.message);
      });
  })
  .catch((err) => console.error(err));

/**
fs.readFile(`${__dirname}/${readFilename}`, 'utf8', (err, data) => {
  console.log('Breed: ', data);
  superAgent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      fs.writeFile(writeFilename, res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

/** */
