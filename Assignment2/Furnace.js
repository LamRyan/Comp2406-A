var http = require('http');
var url = require('url');
var io = require('socket.io');
var options = {
	hostname: 'localhost',
	port:'3000',
	path:'/furnace?start=on'
}

var socket = io.connect();

socket.on('message',function(data){
	console.log(data.message);
});


var Furnace = function() { 
}
var isOn;
function turnOn() {
	isOn= true;
	console.log("Here");
};
function turnOff() {
	isOn= false;
};
Furnace.prototype.isON =function(){ return isOn;};


module.exports = Furnace;

