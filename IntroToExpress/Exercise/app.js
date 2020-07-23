var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there, Welcome to my assignment");
});

app.get("/speak/:pet", function(req,res) {
	var pet = req.params.pet;
	var str = "The " + pet + " says ";
	if(pet === 'pig'){
		c = "'Oink'";
	} else if(pet === 'cow'){
		c = "'Moo'";
	} else if(pet === 'dog'){
		c = "'Woof Woof!'";
	}
	res.send(str + c);
});

app.get("/repeat/:str/:i", function(req, res){
	var i = Number(req.params.i);
	var str = req.params.str;
	var result = ' ';
	while(i>0){
		result += str + ' ';
		i = i - 1;
	}
	res.send(result);
});

app.get("*", function(req, res){
	res.send("Sorry, page not found.. WHat are you doing with your life?");
});

app.listen(3000, function(req, res){
	console.log("Port 3000 has Started");
});