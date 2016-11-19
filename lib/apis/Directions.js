'use strict';

const rp = require('request-promise');

module.exports = class Directions {
  constructor(startCoordinates, endCoordinates) {
    this._token = process.env.ARCGIS_TOKEN;
    this._startCoordinates = startCoordinates;
    this._endCoordinates = endCoordinates;
  }

  async apiRequest(options) {
    try {
      const response = await rp(options);
      return response;
    } catch(error) {
      return error;
    }
  }

  /**
   * Gets time in seconds
   *
   * @returns {number}
   */
  async getDirectionTime() {}
}
