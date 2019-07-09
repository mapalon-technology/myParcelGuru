// author shambhu:-10/06/2019
const http = require('http');
const app = require('./backend/app');
const debug = require("debug")("documents");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

