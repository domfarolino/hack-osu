'use strict';

const y = require('yelp');

module.exports = class Yelp {
  constructor() {
    this._consumerKey = process.env.YELP_CONSUMER_KEY;
    this._consumerSecret = process.env.YELP_CONSUMER_SECRET;
    this._accessToken = process.env.YELP_ACCESS_TOKEN;
    this._accessTokenSecret = process.env.YELP_ACCESS_TOKEN_SECRET;
  }

  async testGetData() {
    const ySearch = new y({
      consumer_key: this._consumerKey,
      consumer_secret: this._consumerSecret,
      token: this._accessToken,
      token_secret: this._accessTokenSecret
    });

    const yPromise = await ySearch.search({ term: 'food', location: 'Montreal' });
    return yPromise;
  }
}
