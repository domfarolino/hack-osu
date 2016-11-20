'use strict';

const Coordinate = require('../Coordinate');
const Directions = require('./Directions');
const Yelp = require('./Yelp');
const Utils = require('../Utils');

module.exports = class MapData {
  /**
   *
   * @param userCoordinate {Coordinate} the user's coordinates
   * @param userLocationName {String} the user's location as a string
   * @param foodCategory {String} the food category to search
   */
  constructor(userCoordinate, userLocationName, foodCategory) {
    this._userCoordinate = userCoordinate;
    this._userLocationName = userLocationName;
    this._foodCategory = foodCategory;
  }

  /**
   *
   */
  async getData() {
    try {
      let data = null;

      // populate data with yelp data
      const Y = new Yelp();
      data = await Y.getDataGivenCity(this._foodCategory, this._userLocationName);
      data = Utils.YelpBusinessFilter(data);

      // populate data with directions data
      const destinationCoordinates = data.map(business => new Coordinate(business.coordinates.latitude, business.coordinates.longitude));
      const D = new Directions(this._userCoordinate, destinationCoordinates);
      let directions = await D.getDirections();
      // returned data is backwards, so reverse it
      directions = directions.reverse();

      //data = data.map(object => object.directions = directions[]);

      return data;
    } catch(error) {
      return error;
    }
  }

  /**
   * Compares and sorts map data. Returns a sorted object.
   *
   * @param a {Object}
   * @param b {Object}
   * @returns {Object}
   */
  compareAndSortMapData(a, b) {
    // TODO
  }
}
