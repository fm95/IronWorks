'use strict'

const zip = new require('node-zip');
const fs = require('fs');
const archiver = require('archiver');

// require generator

module.exports = class ApplicationController {

    constructor(data) {
        this.rawData = 0;
    }

    codeGenerator(data) {
        // TODO
    }

}
