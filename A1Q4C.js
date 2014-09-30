var http = require('http'); //need to http
var fs = require('fs'); //need to read static files
var colour = require('colour');

var counter = 1000; //to count invocations of function(req,res)

function serveStaticFile(res, path, contentType, responseCode){
   if(!responseCode) responseCode = 200;
   fs.readFile(__dirname + path, function(err, data){
     if(err){
       //for now use success code
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.end('[' + counter++ + ']: ' + '500 INTERNAL FILE ERROR' + '\n');
     }
     else {
       res.writeHead(responseCode , {'Content-Type': contentType});
       res.end(data);

     }
   });
}

//replace ? query portion and trailing '/' in url
//with emtpy string using a regular expression pattern


http.createServer(function (request,response){
     var path = request.url.replace(/\/?(?:\?.*)$/,'').toLowerCase();

	 
//Function to separate lines for the lyrics	 
function printChords(inp){
	var result = ["",""]; //output lines
	var str = inp; //local copy of input for modifying
	var offset = 0; //offset caused by pasting the last chord (e.g. Esus2 shifts the following E 5 characters over)
    var sresult='';
	
	while(str.indexOf("[") != -1){
		//all chords are of the format [chord], find it by finding [ and ]
		var leftBrace = str.indexOf("[");
		var rightBrace = str.indexOf("]");

		//take the lyrics from start to [
		result[0] += str.substring(0,leftBrace);

		//pad spaces to where the chord belongs on the chord line
		for(i = offset; i < leftBrace; i++)
			result[1] += '&nbsp';
		if(leftBrace < offset) result[1] += '&nbsp'; //if no padding was added (two chords in a row), add a space

		//get the chord from between the braces
		result[1] += str.substring(leftBrace+1, rightBrace);
		offset = rightBrace-leftBrace;
	
		//str = remainder of string after ]
		str = str.substring(rightBrace+1, 999).trim();
	}
	result[0] += str;
	if(result[1].length ==0){
		sresult+='<p><font color ="black">'+result[0]+'</font></p>';
	}else{
		sresult+='<p><font color ="green">'+result[1]+'</font></p>' +'<p><font color ="black">'+result[0]+'</font></p>';
	}
	//response.write(result[1]+'\n');
	//response.write(result[0]+'\n');
	
	return sresult;
}

   //write HTTP header
   var lyrics='';
   var page = '';
   switch(path){
     case '/index.html':
       serveStaticFile(response,
                       '/public/index.html',
                       'text/html');
       break;
	case '/sister_golden_hair.html':
		page = 'SISTER_GOLDEN_HAIR';
		sname='songs/sister_golden_hair.txt'
		for(var i in array=fs.readFileSync(sname).toString().split("\n")) {
			lyrics+=printChords(array[i]);
		}
       break;
	case '/seasons.html':
		page = 'SEASONS';
		sname='songs/Seasons.txt'
		for(var i in array=fs.readFileSync(sname).toString().split("\n")) {
			lyrics+=printChords(array[i]);
		}
       break;
	case '/youve_got_a_friend.html':
		page = "You've Got a Friend";
		sname='songs/youve_got_a_friend.txt'
		for(var i in array=fs.readFileSync(sname).toString().split("\n")) {
			lyrics+=printChords(array[i]);
		}
       break;
	 case '/jammin.html':
		page = "Jammin";
		sname='songs/Jammin.txt'
		for(var i in array=fs.readFileSync(sname).toString().split("\n")) {
			lyrics+=printChords(array[i]);
		}
       break;
     default:
       page = 'ERROR 404 PAGE NOT FOUND';
       //exercise: change error code to 404 instead of 200
       //and see how the browser responds
       break;

	}
	if(path!= '/index.html'){
		lyrics+=''
		response.writeHead(200, {'Content-Type': 'text/html'});
		var head='<head> <title> Our first document </title> </head>';
		var body= '<p style = "font-family:Time New Roman;">'+ lyrics+  '</p>';
		response.end(head + body);
	}
	
   //end HTTP response and provide final data to send
}).listen(3000, "127.0.0.1");
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');

var sname;
//sname='songs/sister_golden_hair.txt';
var fs = require('fs'); 
//var array = fs.readFileSync(sname).toString().split("\n"); 