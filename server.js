const koa = require('koa2');
const websockify = require('koa-websocket');
const server = websockify(new koa());

const port = 3000,
      mode = process.env.NODE_ENV;

// import common middlewares
const bodyParser = require('koa-bodyparser');

const staticFiles = require('./server/middlewares/staticFiles');
const route = require('./server/middlewares/route');

// use middlewares
server.use(bodyParser());
server.use(staticFiles('/', './app'));
server.use(route());

// start server
server.listen(port, () => {
      console.log(`App is running on ${port}...`);
});

