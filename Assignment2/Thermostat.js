// Thermostat.js
var util = require("util");
var EventEmitter = require('events').EventEmitter;

var desiredTemperature = 20; //desired room temperature
var hysteresis = 2.5; //thermostat hysteresis
var roomTemp =19;

var Class = function() { }

util.inherits(Class, EventEmitter);

Class.prototype.temp = function(temp) {

  if(temp < desiredTemperature - hysteresis ) {
      return 1;
  }
  else if(temp > desiredTemperature + hysteresis) { 
     return -1;
  }
  return 0;
};
Class.prototype.getRoomTemp = function(){
	return roomTemp;
};
Class.prototype.setRoomTemp = function(t){
	roomTemp = t;
};

Class.prototype.setThermostat = function(temp){
   desiredTemperature = temp;
};

module.exports = Class; 