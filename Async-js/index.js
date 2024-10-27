// consuming promises with async await.
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
/** */
const getDogPick = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/${readFilename}`);
    const res = await superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const writeFileRes = await writeFilePromise(
      writeFilename,
      res.body.message
    );
    console.log(writeFileRes);
  } catch (err) {
    console.log(err);
  }
};



getDogPick();

/** */
//Returning value from async function
const getDogPick1 = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/${readFilename}`);
    const res = await superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    // console.log(res.body.message);
    return res.body.message;
  } catch (error) {
    //Needs to explicitly thow an error otherwise function call won't catch it.
    throw 'This is an explict error';
    console.error(error);
  }
};

/** */
console.log('Start the action.');
//Pattern 1 uing .then() method
const value = getDogPick1()
  .then((res) => {
    console.warn(res);
    console.log('end fetching');
  })
  .catch((err) => console.error(err)); // when async function returns something we need to use then.
/** */

/** */
//pattern 2 : Using IIFE async await

(async () => {
  try {
    console.clear()
    console.log('Start Promise call');
    const response = await getDogPick1();
    console.warn(response);
  } catch (error) {
    console.error(error);
  }
})();


/** */

/** */
//Multiple promise at same time =>

const getDogPick2 = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/${readFilename}`);
    //don't use await first store them in varaibles and the consume with Promise.all
    const res1 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log([res1, res2, res3]);
    const all = await Promise.all([res1, res2, res3]);
    console.warn(all.map((i) => i.body.message));
    // console.log(res.body.message);
    // return res.body.message;
  } catch (error) {
    //Needs to explicitly thow an error otherwise function call won't catch it.
    throw 'This is an explict error';
    console.error(error);
  }
};

getDogPick2();

/** */
//fetch data 10 times from same api

const getDosPics3 = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/${readFilename}`);
    const allPromises = [];
    for (let i = 1; i <= 10; i++) {
      const res = superAgent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
      );
      allPromises.push(res);
    }
    const allres = await Promise.all(allPromises);
    console.log(allres.map((i) => i.body.message)); //All 10 response data
  } catch (error) {
    console.error(error);
  }
};
getDosPics3();

/** */
