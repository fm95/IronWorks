'use strict'

const zip = new require('node-zip');
const fs = require('fs');
const archiver = require('archiver');

let JavaGenerator = require('./generators/javaGenerator.js');

module.exports = class ApplicationController {

    constructor(data) {
        this.rawData = 0;
        this.java = new JavaGenerator();
        // SQL
        // XML
    }

    codeGenerator(data) {
      //console.log(data);
      let javaCode = this.java.generate(data);
      return {'java': javaCode};
    }

}
