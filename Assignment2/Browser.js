var http = require('http'); //need to http
var fs = require('fs'); //need to read 
var temperature = 20;

function increment(){
	temperature++;
	console.log(temperature);
}

http.createServer(function (request,response){
	var path = request.url.replace(/\/?(?:\?.*)$/,'').toLowerCase();
	
	var temp = '<p>The temperature is: ' + temperature + '</p>'
	
	var page = '<html><head><title>External Example</title><meta http-equiv=”refresh” content=”5" /></head>' +
    '<body>' +
    '<form>' +
    'Temperature: <input name="temp"><br>' +
    '<input type="submit" value="Set Temperature">' +
    '</form>';
	
	page+= temp + '<br><button type="button" onclick="increment">Increment Temp</button>';
	
	page+='<button type="button" onclick="decrement()">Decrement Temp</button>';
	
	page+='<br><A HREF="javascript:window.location.reload()">Click to refresh the page</A><br>'
	page += '</body></html>';
	
	switch(path){
	case '/index.html':
       //serveStaticFile(response,
       //                '/public/index.html',
       //                'text/html');
       response.write(page);
	   response.end();
	   break;
	default:
       page = 'ERROR 404 PAGE NOT FOUND';
       break;
	}
	

}).listen(3000);
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');