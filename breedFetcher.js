const request = require('request');

const fetchBreedDescription = (breedQuery, callback) => { // This function should also accept a callback! because it's using request which is async (it can't return a value)
  
  request('https://api.thecatapi.com/v1/breeds/search?q=' + breedQuery, (error, response, body) => {
    // The server gives us an array of json objects (as a string) from our query
    const data = JSON.parse(body); // Now we have parsed the string into a javascript array of objects [{}] this is called "deserialization"
  
    if (!error) { // error is the error obj we get from request
      callback(null, data); // we give the entire array from body to the callback instead of just the description
    } else {
      callback(error, null);
    }

  });
  
};

module.exports = { fetchBreedDescription };