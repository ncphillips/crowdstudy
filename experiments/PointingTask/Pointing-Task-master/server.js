var fileToLoad = 'pointing.html';
var listenedPort = 4000;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var os = require('os');

var myIP;
var ifaces=os.networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].forEach(function(details){
        if (details.family == 'IPv4' && !details.internal) {
            myIP = details.address;
        }
    });
}

app.get('/', function(req, res){
    res.sendfile(fileToLoad);
});

io.on('connection', function(socket){
    console.log('a user connected');

    var moveLog = "";
    var clickLog = "";

    socket.on('init', function(PID){
	moveLog = './logs/CursorMovement-PID-'+ PID + '-TimeStamp-' + Date.now() + '.txt';
        var movefile = fs.open(moveLog, 'w', function (err) {
        	if (err) throw err;
        	console.log('File Opened For Logging Movement.');
        	fs.appendFile(moveLog, "PID; W; D; Wr; Dr; tot; Target; X; Y; Time; Browser; OS; Invisible; Block\n");
        });
        
	clickLog = './logs/ClickData-PID-'+ PID + '-TimeStamp-' + Date.now() + '.txt';
        var clickfile = fs.open(clickLog, 'w', function (err) {
        	if (err) throw err;
        	console.log('File Opened For Logging Clicks.');
        	fs.appendFile(clickLog, "PID; W; D; Wr; Dr; tot; Target; Start; End; MouseDown; Error; Browser; OS; Invisible; Block;\n");
    	});
    });

    socket.on('moveLog', function(msg){
        fs.appendFile(moveLog, msg);
        // console.log(msg);
    });
  
    socket.on('clickLog', function(msg){
        fs.appendFile(clickLog, msg);
        //console.log(msg);
    });

    socket.on('consoleLog', function(msg){
        console.log(msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(listenedPort, function(){
    console.log('listening on ' + myIP + ':' + listenedPort);
});
