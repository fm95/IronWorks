const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');


let ApplicationController = require('./../../ApplicationTier/ApplicationController.js');
let IndexGiver = require("./../Controller/getIndex.js");

// 404 GIVER da fare

module.exports = class PresentationController {

    constructor(hostname, port) {
        this.hostname = hostname;
        this.port = port;
        this.app = express();
        this.resourcesPath = __dirname + './../../public';
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
        this.ApplicationController = new ApplicationController();
    }

    requestHandler() {
        //debugger;
        //this.app.post('/', (req, res) => res.sendFile(this.resourcesPath + 'index.html'));

        /* GET home page. */
        router.get('/', (req, res, next) => { res.sendFile(IndexGiver.getIndex());});

        this.app.post('/export', (req, res) => this.exportRequest(req, res));
        //this.app.get("*", (req,res) => res.sendFile(this.resourcesPath + "404.html"));
    }

    exportRequest(req, res) {
        let toReturn = this.ApplicationController.generateCode(JSON.parse(req.body.data));
        var zip = Archiver('zip');
        res.header('Content-Disposition', 'attachment; filename="' + req.body.name + '.zip"');
        zip.pipe(res);
        for(let key in toReturn) {
            zip.append(toReturn[key], {name: 'file'+key+'.'+key});
        }
        zip.append(req.body.pro, {name: req.body.name + '.pro'});
        zip.finalize();
    }

    startServer() { // DA CAMBIARE CON LINK A LOCALHOST
        this.app.listen(this.port, this.hostname, () => console.log('In ascolto su: ' + this.hostname + ':' + this.port));
    }
}
