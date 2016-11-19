'use strict';

require('dotenv').config();

const restify = require('restify');
const utils = require('./lib/utils');
const Yelp = require('./lib/apis').Yelp;
const YELP_CONSUMER_KEY = process.env.YELP_CONSUMER_KEY;

const yelpInstance = new Yelp();

const yelpFoodAndLocationResponse = async (request, response, next) => {
  try {
    let apiResponse = await yelpInstance.testGetData(request.params.food, request.params.location);

    apiResponse = apiResponse.businesses.filter(business => {
      if (!business.is_closed) return business;
    }).map(business => ({
      name: business.name,
      rating: business.rating,
      image_url: business.image_url,
      display_address: business.location.display_address,
      coordinates: business.location.coordinate
    }));

    response.send(await apiResponse);
  } catch (apiError) {
    response.send(await apiError);
  }

  next();
}

const server = restify.createServer();
server.get('/api/:food/:location', yelpFoodAndLocationResponse);
server.head('/api/:food/:location', yelpFoodAndLocationResponse);

server.listen(process.env.SERVE_PORT, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
