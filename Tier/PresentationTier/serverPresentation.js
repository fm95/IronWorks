var ApplicationController = require('../ApplicationTier/ApplicationController');
var Archiver = require('archiver');

const express = require('express');
const bodyParser = require("body-parser");

module.exports = class PresentationController {

    constructor(hostname, port) {
        this.hostname = hostname;
        this.port = port;
        this.app = express();
        this.resourcesPath = __dirname + '../../public';
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.serverApp = new ApplicationController();
    }

    requestHandler() {
        debugger;
        this.app.post('/', (req, res) => res.sendFile(this.resourcesPath + 'index.html'));
        this.app.post('/compile', (req, res) => this.compileRequest(req, res));
        this.app.post('/export', (req, res) => this.exportRequest(req, res));
        this.app.get("*", (req,res) => res.sendFile(this.resourcesPath + "404.html"));
    }

    compileRequest(req, res) {
        this.serverApp.requestCompile(req.body);
        let returnData = { success : true };
        res.send(returnData);
    }
    exportRequest(req, res) {
        let toReturn = this.serverApp.getZip(JSON.parse(req.body.data));
        var zip = Archiver('zip');
        res.header('Content-Disposition', 'attachment; filename="' + req.body.name + '.zip"');
        // Send the file to the page output.
        zip.pipe(res);
        // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
        for(let key in toReturn) {
            zip.append(toReturn[key], {name: 'file'+key+'.'+key});
        }
        zip.append(req.body.pro, {name: req.body.name + '.pro'});
        zip.finalize();

    }

    startServer() {
        this.app.listen(this.port, this.hostname, () => console.log('Listening on: ' + this.hostname + ':' + this.port + '... CTRL+C to terminate'));
    }
}