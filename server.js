var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var proxy = httpProxy.createProxyServer();
var app = express();
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId mongodb.ObjectID;

var IMAGES_COLLECTION = 'images;'
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');


//Point to static assets

app.use(express.static(publicPath));

app.use(bodyParser.json());

//we only want to run workflow when not in production
if(!isProduction) {
  //we require bundler because
  //its only needed in a dev environment
  var bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}
var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if(err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Successfully connected to database");
  //important to catch any errors from proxy or server will crash
  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

  app.listen(port, function() {
    console.log('Server running on port ' + port);
  });
});
