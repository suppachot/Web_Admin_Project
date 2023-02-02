const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '192.168.1.48',
    user: '',
    password: '',
    database: 'database'
});

connection.connect((err) => {
    if (!!err) {
        console.log(err);
    } else {
        console.log('Connected...');
    }
  
  });

  module.exports = connection
  