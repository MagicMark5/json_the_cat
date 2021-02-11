const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const breedQuery = process.argv.slice(2,3); // should be just the ["first-argument"] after node breedFetcher.js

const handleError = (errorObj) => {
  console.log(`Failed to "${errorObj.syscall}" from "${errorObj.hostname}" due to error code: "${errorObj.code}"`);
  process.exit();
};

const printData = (dataObj) => {
  const data = dataObj;
  console.log("Description: \n" + data[0].description + "\n");
  console.log("Origin: \n" + data[0].origin + "\n");
  console.log("Temperment: \n" + data[0].temperament);
};

const presentOptions = (dataArray) => {
  const breedResults = [];
  for (const cat of dataArray) {
    breedResults.push(cat["name"].toLowerCase());
  }
  console.log(`Your search "${breedQuery[0]}" produced these results: \n=> ${breedResults.join(", ").toLowerCase()} \n`);
  rl.question(`Which breed were you looking for? \n(Type the full breed name then Enter, return any other key to quit) `, (answer) => { // callback for question is called when ENTER is pressed (because its 'readline')
    console.log("=============================================================================\n");
    breedResults.includes(answer.toLowerCase()) ? requestCat(answer) : process.exit();
    rl.close();
  });
};

const requestCat = (query) => {
  request('https://api.thecatapi.com/v1/breeds/search?q=' + query, (error, response, body) => {
    // The server gives us an array of json objects (as a string) from our query
    if (error) handleError(error); // In the event that the request fails, the error argument in our callback function would NOT be undefined, and instead contain details.
    const data = JSON.parse(body); // Now we have parsed the string into a javascript array of objects [{}] this is called "deserialization"
    if (data.length < 1) {
      console.log(`The requested breed ${query} was not found :(`);
    } else if (data.length > 1) {
      presentOptions(data);
    } else {
      printData(data);
    }
  });
};

requestCat(breedQuery[0]);