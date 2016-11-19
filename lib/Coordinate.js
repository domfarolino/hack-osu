'use strict';

module.exports = class Coordinate {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  /**
   * Converts the coordinates to a string seperated by a comma
   */
  toString() {
    return this.lat.toString() + ',' + this.long.toString();
  }
}
