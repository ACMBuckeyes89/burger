//Importing MySQL connection from connection.js
var connection = require("../config/connection.js");

//Methods for executing MySQL commands in the controllers
//Creating a function to turn values into arrays
function printQuestionMarks(num) {
	//The num parameter is the number of values user wants to input and in turn will push equal amount of "?"
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	//Returns the array of questions marks into strings
	return arr.toString();
}	;

//Functions to convert object key/value pairs to SQL syntax
function objToSQL(ob) {
	var arr = [];

	//Looping through the keys and pushing the key/value as a string into empty arr variable
	//Declaring a var key inside the for loop
	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			//For string with spaces, quotations are added
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			arr.push(key + "=" + value);
		}
	}
};
//Storing all methods into an object variable
var orm = {
	//Creating the selectAll method that will call all data from burgers table
	selectAll: function(tableInput, echo) {
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}	
			echo(result);
		});
	},
	//Creating the insertOne method that will create data and add it to burgers table
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table; 

		queryString += " (";
		//Will convert the column input into a string
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}	
			cb(result);
		});
	},
	//Creating updateOne method that will update current information 
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table; 

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	}
};

module.exports = orm;
