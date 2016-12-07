var express = require('express');
var app = express();

app.get('/builds/test/', function(req, res) {
  res.sendFile(__dirname + '/builds/test');
});
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/builds/test/index.html');
  console.log(__dirname + 'builds/test/index.html');
})

app.listen(process.env.PORT || 8080, function() {
  console.log('listening to port');
});
