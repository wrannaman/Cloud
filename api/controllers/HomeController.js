/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function( req, res, next ) {
		var request = require('request');
		request('http://api.openweathermap.org/data/2.5/weather?APPID=148d53fb6725792816f85617caf28097&zip=90402,US', function (error, response, body) {
			var location 		= null;
			var weather  		= null;
			var wind 				= null;

			if (!error && response.statusCode == 200) {
				body = JSON.parse(body);
				location = body.name;
				weather = body.weather[0].description;
				wind = body.wind.speed;
				console.log('wind', wind);
		  }
			res.view('homepage', {
	      time: new Date(),
				location: location,
				weather : weather,
				wind: wind,
	    })
		})
  }

};
