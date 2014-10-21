// Thermostat.js
var util = require("util");
var http = require("http");
var url = require("url");
var qstring = require('querystring');


var EventEmitter = require('events').EventEmitter;
var desiredTemperature = 20; //desired room temperature
var hysteresis = 2.5; //thermostat hysteresis
var roomTemp =19;
var isOn;

var Class = function() { }
util.inherits(Class, EventEmitter);

var options = {
	hostname: 'localhost',
	port:'3000',
	path:'/'
}

function temp (t) { //Posts information to localHost
  if(t < desiredTemperature - hysteresis ) {
	  return 1;
  }
  else if(t > desiredTemperature + hysteresis) { 
	  return -1;
  }
  
}

Class.prototype.getRoomTemp = function(){
	return roomTemp;
};
Class.prototype.setRoomTemp = function(t){
	roomTemp = t;
};

Class.prototype.setThermostat = function(temp){
   desiredTemperature = temp;
};


setInterval(function(){console.log("Temp: " + roomTemp++)},1000);

 var urlObj; 
  http.createServer(function (request,response){
     urlObj = url.parse(request.url, true, false);
		setInterval(function(){
			console.log("Temp: " + roomTemp++)
			if (temp(roomTemp) == 1)
				response.write("turnOn");
			else
				response.write("turnOff");
		
		},1000);

 }).listen(3000);
 function handleResponse(response){
  var serverData ='';
  response.on('data',function(chunk){
  serverData=""+chunk;
  console.log(serverData);
  
  });
  response.on('end', function(){
     console.log('Response Status: ', response.statusCode);
     console.log('Response Headers: ',response.headers);
     console.log(serverData);
     });
}
 
 
   
module.exports = Class; 
