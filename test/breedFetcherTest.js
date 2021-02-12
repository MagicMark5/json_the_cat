const { fetchBreedDescription } = require('../breedFetcher');
const { assert } = require('chai');

describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (err, data) => {
      // we expect no error for this scenario
      assert.equal(err, null); // expecting error to be equal to null b/c no error, great!
      
      const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";

      // compare returned description
      assert.equal(expectedDesc, data[0].description.trim());

      done();
    });
  });

  it('returns null for an invalid breed, via callback', (done) => {
    fetchBreedDescription('Sibleeeerian', (err) => {
      // we expect an error for this scenario
      assert.equal(err, null);

      done();
    });
  });
});