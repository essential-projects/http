'use strict';

const HttpClient = require('./dist/commonjs/index').HttpClient;

function registerInContainer(container) {

  container.register('HttpClient', HttpClient)
    .singleton();

}

module.exports.registerInContainer = registerInContainer;
