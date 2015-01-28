var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nomissing'
    },
    port: 3000,
    db: 'mongodb://heroku_app32946731:phcakiiklkjbe523kqva4pk68i@ds053688.mongolab.com:53688/heroku_app32946731'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nomissing'
    },
    port: 3000,
    db: 'mongodb://localhost/nomissing-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nomissing'
    },
    port: 3000,
    db: 'mongodb://localhost/nomissing-production'
  }
};

module.exports = config[env];
