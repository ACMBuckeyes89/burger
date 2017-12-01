//Setting up MySQL connection
var mysql = require("mysql"); 

var connection = mysql.createConnection({
	port: 3306,
	host: "localhost",
	user: "root",
	password: "",
	database: "burgers_db"
});

//Making the connection to Node
connection.connect(function(err) {
	if (err) {
		console.log("error connecting: " + err.stack);	
		return;
	}
	console.log("connected as id: " + connection.threadID);
});

//Exporting the connection for ORM.js to use
module.exports = connection;
