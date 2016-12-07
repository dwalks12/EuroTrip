var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Eurotrip',
});

con.connect(function(err) {
  if(err) {
    console.log('error connecting to database');
    return;
  }
  console.log('Connected to database');
});
con.query('SELECT * FROM users', function(err, rows) {
  if(err) throw err;

  console.log('Data recieved');
  console.log(rows);
});

// con.end(function(err) {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });
