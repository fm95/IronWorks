'use strict'

const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
let archiver = require('archiver');


let ApplicationController = require('./../../ApplicationTier/ApplicationController.js');

let index = require("./../Controller/getIndex.js");
let E404 = require("./../Controller/get404.js");


module.exports = class Presentation {

    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.App = express();
        this.resourcesPath = path.join(__dirname + './../../public');
        this.App.use(bodyParser.json());
        this.App.use(bodyParser.urlencoded({ extended: true }));
        this.App.use(express.static('public'));
        this.ApplicationController = new ApplicationController();
    }

    router() {

        /* Home page */
        this.App.post('/', (req, res, next) => { res.sendFile(index.getIndex());});

        /* Download */
        this.App.post('/esporta', (req, res, next) => this.download(req, res));

        /* 404 */
        this.App.post('*', (req, res, next) => { res.sendFile(E404.get404());});

    }

    download(req, res) {
      let data = this.ApplicationController.codeGenerator(JSON.parse(req.body.data));
      let zip = archiver('zip');
      res.header('Content-Disposition', 'attachment; filename="' + req.body.name + '.zip"');
      zip.pipe(res);
      for(let type in data) {
          zip.append(data[type], {name: req.body.name + '.' + type});
      }
      zip.append(req.body.zip, {name: req.body.name + '.json'});
      zip.finalize();
    }

    start() {
        this.App.listen(this.port, this.host, () => console.log('In ascolto su: ' + this.host + ':' + this.port));
    }
}
