

var Furnace = function(serv) { 
	serv.on("run",turnOn);
	serv.on("stop",turnOff);
}
var isOn;
function turnOn() {
	isOn= true;
};
function turnOff() {
	isOn= false;
};
Furnace.prototype.isON =function(){ return isOn;};


module.exports = Furnace;

