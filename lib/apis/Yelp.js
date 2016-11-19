'use strict';

const rp = require('request-promise');

module.exports = class Yelp {
  constructor() {
    console.log('Yay yelp');
  }

  async testGetData() {
    const options = {
      method: 'GET',
      uri: 'https://jsonplaceholder.typicode.com/posts/1'
    }
    return await rp(options);
  }
}
