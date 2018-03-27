const mysql = require('mysql');
const dotenv = require('dotenv').config();

module.exports = {
	createSqlConnection: createSqlConnection,
	getSqlConnection: getSqlConnection,
	endSqlConnection: endSqlConnection
}

var sql_host = process.env.SQL_HOST_LOCAL // This will need to change to include Heroku credentials
var sql_user = process.env.SQL_USER
var sql_password = process.env.SQL_PASSWORD
var sql_db = process.env.TheBank

var connection = mysql.createConnection({
  host     : sql_host,
  user     : sql_user,
  password : sql_password,
  database : sql_db
});

function createSqlConnection() {
	return new Promise((resolve, reject) => {
		connection.connect(err => {
		  if (err) {
		    reject(err)
		  }

		  resolve(connection.threadId)
		})
	})
}

function getSqlConnection() {
	return connection
}

function endSqlConnection(obj) {
	console.log('The connection to db with threadId ' + obj.threadId + ' has ended.')
	obj.end();
}

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();