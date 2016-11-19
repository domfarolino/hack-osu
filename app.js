'use strict';

require('dotenv').config();

const restify = require('restify');
const Yelp = require('./lib/apis').Yelp;
const YELP_CONSUMER_KEY = process.env.YELP_CONSUMER_KEY;

console.log(YELP_CONSUMER_KEY);

const yelpInstance = new Yelp();
yelpInstance.testGetData().then(response => {console.log(response)}).catch(e => {console.error(e)});

const respond = (request, response, next) => {
  response.send({ hello: request.params.name });
  next();
}

const server = restify.createServer();
server.get('/api/:name', respond);
server.head('/api/:name', respond);

server.listen(process.env.SERVE_PORT, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
