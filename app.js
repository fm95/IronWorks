'use strict'

let Presentation = require('./Tier/PresentationTier/Middleware/Index.js');

const host = '127.0.0.1'; // localhost
const port = process.env.PORT || 3000; 

let server = new Presentation(host, port);
server.start();
server.router();

