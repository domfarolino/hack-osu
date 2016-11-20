'use strict';

const y = require('yelp');

module.exports = class Yelp {
  constructor() {
    this._consumerKey = process.env.YELP_CONSUMER_KEY;
    this._consumerSecret = process.env.YELP_CONSUMER_SECRET;
    this._accessToken = process.env.YELP_ACCESS_TOKEN;
    this._accessTokenSecret = process.env.YELP_ACCESS_TOKEN_SECRET;
  }

  getDataGivenCity(inputFood = 'food', inputLocation = 'Cincinnati') {
    console.log(`Given ${inputFood} and ${inputLocation}`);
    const ySearch = new y({
      consumer_key: this._consumerKey,
      consumer_secret: this._consumerSecret,
      token: this._accessToken,
      token_secret: this._accessTokenSecret
    });

    return ySearch.search({ term: inputFood, location: inputLocation });
  }

  getDataGivenCoordinates(inputFood = 'food', inputLatitude = 39.117958, inputLongitude = -84.442722) {
    console.log(`Given ${inputFood} and ${inputLatitude} & ${inputLongitude}`);
    const ySearch = new y({
      consumer_key: this._consumerKey,
      consumer_secret: this._consumerSecret,
      token: this._accessToken,
      token_secret: this._accessTokenSecret
    });

    return ySearch.search({ term: inputFood, location: `cincinnati`, cll: `${inputLatitude},${inputLongitude}` });
  }
}
