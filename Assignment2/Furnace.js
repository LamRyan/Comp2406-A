var http = require('http');
var url = require('url');

var options = {
	hostname: 'localhost',
	port:'3000',
	path:'/furnace?start=on'
}


setInterval(function(){
   }, 1000);

function handleResponse(response){
  var serverData = '';
  response.on('data', function(chunk){
    serverData = ""+chunk; 
  	if(serverData == "turnOn") response.write("on");
	else response.write("off");
  } );
  
  response.on('end', function(){
     console.log('Response Status: ', response.statusCode);
     console.log('Response Headers: ',response.headers);
     console.log(serverData);
     });
}

http.request(options, function(response){
   handleResponse(response);
   }).end();
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

