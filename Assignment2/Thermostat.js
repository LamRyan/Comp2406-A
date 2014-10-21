// Thermostat.js
var util = require("util");
var http = require("http");
var url = require("url");
var qstring = require('querystring');
var io= require('socket.io');


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

var server = http.createServer(function (request,response){
	response.write("connected");
	response.end();

 })
 server.listen(3000);
 var io = listen(server);
 
 io.sockets.on('connection',function(socket){
	socket.emit('message',{'message' : 'Hello world'});
 });
   
module.exports = Class; 
