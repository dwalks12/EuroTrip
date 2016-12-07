var express = require('express');
var app = express();

app.get(express.static(__dirname + '/builds/test'));

app.listen(process.env.PORT || 8080);
