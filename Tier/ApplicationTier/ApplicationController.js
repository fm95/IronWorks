'use strict'
let JavaGenerator = require('./generator/javaGenerator');
let SQLGenerator = require('./generator/sqlGenerator');
let XMLGenerator = require('./generator/xmlGenerator');
var Archiver = require('archiver');

let fs = require('fs');
let zip = new require('node-zip')();

module.exports = class ApplicationController {

    constructor(data) {
        this.rawData = 0;
    }

    generateCode(data) {
        let javaG = new JavaGenerator();
        let sqlG = new SQLGenerator();
        let xmlG = new XMLGenerator();
        let javaFiles = javaG.generate(data);
        let sqlFiles = sqlG.generate(data);
        let xmlFiles = xmlG.generate(data);
        //return javaFiles;
        return {'java': javaFiles, 'sql': sqlFiles, 'xml': xmlFiles};
    }

}
