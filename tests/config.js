const path = require('path');
const config = {};

config.root = path.join(__dirname, 'view');
config.layoutsDir = path.join(config.root, 'layouts');

module.exports = config;
