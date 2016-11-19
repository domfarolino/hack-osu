'use strict';

require('dotenv').config();

const rp = require('request-promise');

module.exports = class Directions {
  /**
   * @param userCoordinate {Coordinate} the user's coordinate
   * @param destinationCoordinates {Coordinate[]} an array of coordinates
   */
  constructor(userCoordinate, destinationCoordinates) {
    this._token = process.env.ARCGIS_TOKEN;
    this._userCoordinate = userCoordinate;
    this._destinationCoordinates = destinationCoordinates;
    this._maxTargetDestinations = 10; // max for ArcGIS api
  }

  async apiRequest() {
    try {
      const userCoordinate = this._userCoordinate.toString();
      const destinationCoordinates = this._destinationCoordinates.map(object => `${object.toString()};`).reduce((a, b) => a + b);
      const options = {
        uri: `https://route.arcgis.com/arcgis/rest/services/World/ClosestFacility/NAServer/ClosestFacility_World/solveClosestFacility?token=${this._token}&incidents=${this._userCoordinate}&facilities=${destinationCoordinates}&returnCFRoutes=true&f=json&defaultTargetFacilityCount=${this._maxTargetDestinations}`,
        json: true
      };
      const response = await rp(options);
      return response;
    } catch(error) {
      return error;
    }
  }

  /**
   * Request a new ArcGIS api token
   *
   * @returns {string}
   */
  async requestToken() {}

  /**
   * Gets the directions
   *
   * @returns {Object} the route data for each destination
   */
  async getDirections() {
    try {
      const response = await this.apiRequest();
      const routes = response.routes;
      return routes.features;
    } catch(error) {
      return error;
    }
  }
}
