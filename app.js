'use strict';

require('dotenv').config();

const restify = require('restify');
const Yelp = require('./lib/apis').Yelp;
const MapData = require('./lib/apis/MapData');
const Utils = require('./lib/utils');
const Coordinate = require('./lib/Coordinate');

const YELP_CONSUMER_KEY = process.env.YELP_CONSUMER_KEY;

const yelpInstance = new Yelp();

const yelpFoodAndLocationResponse = async (request, response, next) => {
  try {
    let apiResponse = await yelpInstance.getDataGivenCity(request.params.food, request.params.location);
    apiResponse = Utils.YelpBusinessFilter(apiResponse);
    response.send(apiResponse);
  } catch (apiError) {
    response.send(apiError);
  }

  next();
}

const yelpFoodAndCoordinatesResponse = async (request, response, next) => {
  try {
    let apiResponse = await yelpInstance.getDataGivenCoordinates(request.params.food, request.params.latitude, request.params.longitude);
    apiResponse = Utils.YelpBusinessFilter(apiResponse);
    response.send(apiResponse);
  } catch (apiError) {
    response.send(apiError);
  }

  next();
}

const mapData = async (request, response, next) => {
  try {
    const userCoordinate = new Coordinate(request.params.lat, request.params.long);
    const mapData = new MapData(userCoordinate, request.params.userLoationName, request.params.foodCategory);
    const data = await mapData.getData();
    response.send(data);
  } catch(error) {
    response.send(error);
  }

  next();
}

const server = restify.createServer();
server.get('/api/:foodCategory/:userLoationName/:lat/:long', mapData);
// server.get('/api/:food/:location', yelpFoodAndLocationResponse);
// server.head('/api/:food/:location', yelpFoodAndLocationResponse);

// server.get('/api/:food/:lat/:long', yelpFoodAndCoordinatesResponse);
// server.head('/api/:food', yelpFoodAndCoordinatesResponse);

server.listen(process.env.SERVE_PORT, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
