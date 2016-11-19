'use strict';

require('dotenv').config();

const restify = require('restify');
const Yelp = require('./lib/apis').Yelp;
const YELP_CONSUMER_KEY = process.env.YELP_CONSUMER_KEY;

const yelpInstance = new Yelp();

const respond = async (request, response, next) => {
  try {
    const apiResponse = await yelpInstance.testGetData(request.params.food, request.params.location);
    response.send(await apiResponse);
  } catch (apiError) {
    response.send(await apiError);
  }

  next();
}

const server = restify.createServer();
server.get('/api/:food', respond);
server.head('/api/:food', respond);
server.get('/api/:food/:location', respond);
server.head('/api/:food/:location', respond);

server.listen(process.env.SERVE_PORT, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
