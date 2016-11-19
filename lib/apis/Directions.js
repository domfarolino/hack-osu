'use strict';

const rp = require('request-promise');

module.exports = class Directions {
  constructor(startCoordinates, endCoordinates) {
    this._token = process.env.ARCGIS_TOKEN;
    this.startCoordinates = startCoordinates;
    this.endCoordinates = endCoordinates;
  }

  //https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?token=h2fKmAXyJHgTTrILzGWGuG0p4zS-WX68-0ROugeflLkxQkZEqO3Sh3L6Ka54pPY3CuYflKvZ32hkEppgzGpI4tfW5baksYxJN4X4gE76xOhpj3vmV1Jz1gMh_pRd31cGwCD7ALgm8LRvpKueAZKLaw..&stops=-83.00775999999996,39.998361;-83.0140715,39.9954087&f=json
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
