const {
    join
} = require('path');
const BladeEngine = require('./BladeEngine');
const View = require('./src/View');

const view = new View({
    root: join(__dirname, 'views'),
});

view.use(BladeEngine);

let response = view.render('welcome', {
    name: 'Blade Template'
}).with({
    isLogged: false,
});

let tokens = response.parse();

let responseText = response.toString();

module.exports = {}
