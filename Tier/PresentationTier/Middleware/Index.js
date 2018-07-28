'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');


let ApplicationController = require('./../../ApplicationTier/ApplicationController.js');

let index = require("./../Controller/getIndex.js");
let E404 = require("./../Controller/get404.js");


module.exports = class Presentation {

    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.app = express();
        this.resourcesPath = path.join(__dirname + './../../public');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
        this.ApplicationController = new ApplicationController();
    }

    router() {

        /* Home page */
        router.get('/', (req, res, next) => { res.sendFile(index.getIndex());});

        /* Download */
        router.get('/esporta', (req, res, next) => this.download(req, res));

        /* 404 */
        router.get('*', (req, res, next) => { res.sendFile(E404.get404());});

    }

    download(req, res) {
        // TODO
    }

    start() {
        this.app.listen(this.port, this.host, () => console.log('In ascolto su: ' + this.host + ':' + this.port));
    }
}
