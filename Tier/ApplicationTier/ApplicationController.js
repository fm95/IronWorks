'use strict'

const zip = new require('node-zip');
const fs = require('fs');
const archiver = require('archiver');

// require generator
let JavaGenerator = require('./generators/javaGenerator.js');

module.exports = class ApplicationController {

    constructor(data) {
        this.rawData = 0;
    }

    codeGenerator(data) {
      let javaG = new JavaGenerator();
      let javaFiles = javaG.generate(data);
      return {'java': javaFiles};
    }

}
