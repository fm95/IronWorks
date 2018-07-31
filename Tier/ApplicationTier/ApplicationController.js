'use strict'

const zip = new require('node-zip');
const fs = require('fs');
const archiver = require('archiver');

let JavaGenerator = require('./generators/javaGenerator.js');
let SQLGenerator = require('./generators/sqlGenerator.js');

module.exports = class ApplicationController {

    constructor(data) {
        this.rawData = 0;
        this.java = new JavaGenerator();
        this.sql = new SQLGenerator();
    }

    codeGenerator(data) {
      //console.log(data);

      let javaCode = this.java.generate(data);
      let sqlCode = this.sql.generate(data);

      return {'java': javaCode, 'sql': sqlCode};
    }

}
