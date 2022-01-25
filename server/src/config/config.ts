let config = {};

if (process.env.NODE_ENV === 'prod') {
    config = require('../environments/prod');
} else {
    config = require('../environments/dev');
}

module.exports = config;

