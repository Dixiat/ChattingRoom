const koa = require('koa2');
const webSocket = require('ws');

const port = 3000,
      mode = process.env.NODE_ENV;

// Init Server
const app = websockify(new koa()),
      webSocketServer = webSocketServer.Server;

// Import Common Middleware
const bodyParser = require('koa-bodyparser');

const staticFiles = require('./server/middlewares/staticFiles');
const route = require('./server/middlewares/route');

// Use Middlewares
app.use(bodyParser());
app.ws.use(staticFiles('/', './dist'));
app.ws.use(route());

// Start Server
const server = app.listen(port, () => {
      console.log(`App is running on ${port}...`);
});

// Create WebSocketServer
let wss = new webSocketServer({
      server
});

