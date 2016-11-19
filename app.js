const restify = require('restify');

require('dotenv').config();

respond = (request, response, next) => {
  response.send({ hello: request.params.name });
  next();
}

const server = restify.createServer();
server.get('/api/:name', respond);
server.head('/api/:name', respond);

server.listen(process.env.SERVE_PORT, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
