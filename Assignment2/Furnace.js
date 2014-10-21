var http = require('http');
var url = require('url');
var net = require('net');


var HOST = '127.0.0.1';
var PORT = 3000;


var client = new net.Socket();
client.connect(PORT,HOST,function(){
	console.log("Connected");
});

client.on('data',function(data){
	if(data == 'turnOn') client.write('on');
	else if(data=='turnOff') client.write('off');

});	

client.on('close',function(){
	console.log('closed');
});
var Furnace = function() { 
}


Furnace.prototype.isON =function(){ return isOn;};


module.exports = Furnace;

