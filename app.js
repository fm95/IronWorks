'use strict'

let Presentation = require('./Tier/PresentationTier/Middleware/Index.js');

const hostname = '127.0.0.1'; // localhost
const port = process.env.PORT || 3000; 

let server = new Presentation(hostname, port);
server.start(hostname, port);
server.router();

