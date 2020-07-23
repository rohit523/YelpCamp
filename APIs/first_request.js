// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// var request = require("request");
const rp = require("request-promise");

rp("https://jsonplaceholder.typicode.com/users/1") 
	.then((htmlstring) => {
		var parseData = JSON.parse(htmlstring)
		console.log(`${parseData.name} lives in ${parseData.address.city}`);
	})
	.catch((err) => {
		console.log("Error!", err);
	});
