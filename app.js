'use strict';

require('dotenv').config();

const restify = require('restify');
const Yelp = require('./lib/apis').Yelp;
const YELP_CONSUMER_KEY = process.env.YELP_CONSUMER_KEY;
const Utils = require('./lib/utils');

const yelpInstance = new Yelp();

const yelpFoodAndLocationResponse = async (request, response, next) => {
  try {
    let apiResponse = await yelpInstance.getDataGivenCity(request.params.food, request.params.location);
    apiResponse = Utils.YelpBusinessFilter(apiResponse);
    response.send(await apiResponse);
  } catch (apiError) {
    response.send(await apiError);
  }

  next();
}

const yelpFoodAndCoordinatesResponse = async (request, response, next) => {
  try {
    let apiResponse = await yelpInstance.getDataGivenCoordinates(request.params.food, request.params.latitude, request.params.longitude);
    apiResponse = Utils.YelpBusinessFilter(apiResponse);
    response.send(await apiResponse);
  } catch (apiError) {
    response.send(await apiError);
  }

  next();
}

const server = restify.createServer();
server.get('/api/:food/:location', yelpFoodAndLocationResponse);
server.head('/api/:food/:location', yelpFoodAndLocationResponse);

server.get('/api/:food/:lat/:long', yelpFoodAndCoordinatesResponse);
server.head('/api/:food', yelpFoodAndCoordinatesResponse);

server.listen(process.env.SERVE_PORT, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
