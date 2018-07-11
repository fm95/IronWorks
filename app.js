
let Presentation = require('./Tier/PresentationTier/Middleware/Index.js');

const hostname = '127.0.0.1';
const port = 3000; // OR PORT ENVIRONMENT
var resourcesPath = __dirname + './public/';

let server = new Presentation(hostname, port);
server.startServer(hostname, port);
server.requestHandler();

