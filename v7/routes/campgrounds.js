var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX ROUTE - show all campgrounds
router.get("/", function(req, res){
	// GET ALL CAMPGROUNDS FROM DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});	
		}
	});
});

//CREATE - add new campgrounds to database
router.post("/", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");	
		}
	});
});

//NEW - show form to create new campground
router.get("/new", function(req, res){
	res.render("campgrounds/new");
});

//SHOW - shows more info about campground selected - to be declared after NEW to not overwrite
router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampound){
		if(err){
			console.log(err);
		} else {
			//render show template wiht that campground
			res.render("campgrounds/show", {campground: foundCampound});
		}
	});
});

module.exports = router;