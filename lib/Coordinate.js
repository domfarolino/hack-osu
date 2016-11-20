'use strict';

module.exports = class Coordinate {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  /**
   * Converts the coordinates to a string seperated by a comma
   *
   * @returns {String}
   */
  toString() {
    return this.lat.toString() + ',' + this.long.toString();
  }

  /**
   * Converts the coordinates to a string seperated by a comma,
   * but backwards b/c the ArcGIS api likes it that way
   *
   * @returns {String}
   */
  toStringBackwards() {
    return this.long.toString() + ',' + this.lat.toString();
  }
}
