const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 3000));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('builds/test'));
}
