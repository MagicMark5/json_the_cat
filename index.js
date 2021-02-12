const { fetchBreedDescription } = require('./breedFetcher');
const readline = require('readline');

const breedQuery = process.argv[2]; // should be just the "first-argument" after node breedFetcher.js

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const handleError = (errorObj) => {
  return `Failed to "${errorObj.syscall}" from "${errorObj.hostname}" due to error code: "${errorObj.code}"`;
};

const printData = (dataObj) => {
  const data = dataObj;
  return `Description: \n${data[0].description}\n\nOrigin: \n${data[0].origin}\n\nTemperment: \n${data[0].temperament}`;
  // return data[0].description;
};


const presentOptions = (dataArray) => { // gives user a choice between returned cats in body
  const breedResults = [];
  for (const cat of dataArray) {
    breedResults.push(cat["name"].toLowerCase());
  }
  console.log(`Your search "${breedQuery}" produced these results: \n=> ${breedResults.join(", ").toLowerCase()} \n`);
  rl.question(`Which breed were you looking for? \n(Type the full breed name then Enter, return any other key to quit) `, (answer) => { // callback for question is called when ENTER is pressed (because its 'readline')
    console.log("=============================================================================\n");
    breedResults.includes(answer.toLowerCase()) ? fetchBreedDescription(answer, fetchCallBack) : process.exit();
    rl.close();
  });
};


const fetchCallBack = (error, data) => {
  if (error) {
    console.log(handleError(error));  // In the event that the request fails, the error argument in our callback function would NOT be undefined, and instead contain details.
  } else {
  
    if (data.length < 1) {
      console.log(`The requested breed was not found :(`);
      process.exit();
    } else if (data.length > 1) {
      presentOptions(data); // more than one cat object
    } else {
      console.log(printData(data)); // this will be the case if the array only has one object (one cat)
      process.exit();
    }
  }
};

fetchBreedDescription(breedQuery, fetchCallBack); // this is a call to our fetchBreed function while giving it an inline callback argument!