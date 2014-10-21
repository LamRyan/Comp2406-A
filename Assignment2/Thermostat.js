// Thermostat.js
var util = require("util");
var http = require("http");
var url = require("url");
var net= require('net');

var HOST = '127.0.0.1';
var PORT = 3000;
var EventEmitter = require('events').EventEmitter;
var desiredTemperature = 20; //desired room temperature
var hysteresis = 2.5; //thermostat hysteresis
var roomTemp =19;
var isOn;

var Class = function() { }
util.inherits(Class, EventEmitter);

var sock;
net.createServer(function(socket){
	sock = socket;
	console.log('Connected: ' + sock.remoteAddress+ ':' + sock.remotePort);
	sock.on('data',function(data){
		console.log(""+data);
		if(data == 'off') isOn=false;
		else if(data =='on') isOn=true;
	});
	sock.on('close',function(data){
		console.log("closed");
	});
}).listen(PORT,HOST);
	
var options = {
	hostname: 'localhost',
	port:'3000',
	path:'/'
}

function temp (t) { //Posts information to localHost
  if(t < desiredTemperature - hysteresis ) {
	  sock.write('turnOn');
	  
  }
  else if(t > desiredTemperature + hysteresis) { 
	  sock.write('turnOff');
	 
  }
  
}
Class.prototype.setThermostat = function(temp){
   desiredTemperature = temp;
};

Class.prototype.getRoomTemp = function(){
	return roomTemp;
};
Class.prototype.setRoomTemp = function(t){
	roomTemp = t;
};

 setInterval(function(){
	if(isOn==true) roomTemp++;
	else roomTemp--;
	console.log("Temp: " + roomTemp);
	temp(roomTemp);
	getWeather();
},1000);


   
module.exports = Class; 
