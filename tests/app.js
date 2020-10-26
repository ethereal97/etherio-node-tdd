const fs = require('fs');

const config = require('./config');
const View = require('./src/View');

const view = new View(config);

module.exports = {
    config,
    view
}
