const port = process.env.PORT || 8080;

const connect = require('connect');
const serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(port);
