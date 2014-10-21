var http = require('http'); //need to http
var fs = require('fs'); //need to read static files
var url = require('url');
var Thermostat = require('./Thermostat.js');
var Furnace = require('./Furnace.js');

var util = require("util");
var EventEmitter = require('events').EventEmitter;

var Class = function() { }

util.inherits(Class, EventEmitter);
var serv = new Class();
var therm = new Thermostat();
var furn = new Furnace(serv);
var counter = 1000; //to count invocations of function(req,res)

var ROOT_DIR = 'html'; //dir for static files


setTimeout( function again(){
	
   //if(furn.isON()) therm.setRoomTemp(therm.getRoomTemp() + 1);
	//else therm.setRoomTemp(therm.getRoomTemp() -1);
	
	/*if(therm.temp(therm.getRoomTemp() )== 1){
		serv.emit("run");
	}else if(therm.temp(therm.getRoomTemp()) == -1){
		serv.emit("stop");
	}
	*/
   console.log('TEMP: ' + therm.getRoomTemp());
	
   setTimeout(again, 1000); //recursively restart timeout

   }, 1000);


console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit'); 	


module.exports = Class;