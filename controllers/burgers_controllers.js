//Declaring express()
var express = require("express");

var router = express.Router();

//Importing burger.js
var burger = require("../models/burger.js");

//Creating the routes for the application
//Getting all the burgers from the database to render onto the webpage
router.get("/", function (req, res) {
	burger.selectAll(function(data) {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

//Post the new burger onto the database and subsequently onto the page
router.post("/api/burgers", function (req, res) {
	burger.insertOne([
		"burger_name", "devoured"
	], [
		req.body.burger_name, req.body.devoured
	], function() {
		//Send back the ID of the new entry
		res.redirect("/");
	});
});

//Updating the burger input into the database
router.put("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	burger.updateOne({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect("/")
	});
});

module.exports = router;


