var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hii there!");
});

app.get("/bye", function(req, res){
	res.send("Goodbye!");
});

app.get("/dog", function(req, res){
	res.send("MEOW!");
});

app.get("/r/:subreddit", function(req, res) {
	console.log(req.params.subreddit);
	var subreddit = req.params.subreddit;
	res.send("THIS IS THE " + subreddit.toUpperCase() + " Subreddit!!");
});

app.get("/r/:subreddit/comments/:id/:title/", function(req, res) {
	res.send("WElcome to the comments page!!!");
});

app.get("*", function(req, res) {
	res.send("YOU ARE A STAR!!!");
});

app.listen(3000, function(){
	console.log("port 3000 running");
});
