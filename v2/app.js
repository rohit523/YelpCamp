var express 	= require("express"),
	app 	 	= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose");

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Granite Hill", 
// 	image: "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528_960_720.jpg",
// 	description: "This is a huge granite hill, No bathrooms. No water. Beautiful granite!"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND: ");
// 		console.log(campground);
// 	}
// });

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	// GET ALL CAMPGROUNDS FROM DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds});	
		}
	});
});

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampound){
		if(err){
			console.log(err);
		} else {
			//render show template wiht that campground
			res.render("show", {campground: foundCampound});
		}
	});
});

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});