'use strict';

const rp = require('request-promise');

module.exports = class Yelp {
  constructor(YCK) {
    this._consumerKey = YCK;
    console.log(`Consumer key: ${this._consumerKey}`);
  }

  async testGetData() {
    const options = {
      method: 'GET',
      uri: 'https://jsonplaceholder.typicode.com/posts/1'
    };
    const response = await rp(options);
    return response;
  }
}
