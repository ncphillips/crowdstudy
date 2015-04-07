
exports.app = require('express')();

exports.app.get('/', function(req, res){
    res.sendfile(fileToLoad);
});

exports.init = function (config, server) {
    var fs = require('fs');
    var io = require('socket.io')(server);
    var os = require('os');
    var myIP;

    var fileToLoad = 'pointing.html';

    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        ifaces[dev].forEach(function(details){
            if (details.family == 'IPv4' && !details.internal) {
                myIP = details.address;
            }
        });
    }

    io.on('connection', function (socket) {
        console.log('a user connected');

        var moveLog = "";
        var clickLog = "";

        socket.on('init', function (PID) {
            moveLog = './logs/CursorMovement-PID-' + PID + '-TimeStamp-' + Date.now() + '.txt';
            var movefile = fs.open(moveLog, 'w', function (err) {
                if (err) throw err;
                console.log('File Opened For Logging Movement.');
                fs.appendFile(moveLog, "PID; W; D; Wr; Dr; tot; Target; X; Y; Time; Browser; OS; Invisible; Block\n");
            });

            clickLog = './logs/ClickData-PID-' + PID + '-TimeStamp-' + Date.now() + '.txt';
            var clickfile = fs.open(clickLog, 'w', function (err) {
                if (err) throw err;
                console.log('File Opened For Logging Clicks.');
                fs.appendFile(clickLog, "PID; W; D; Wr; Dr; tot; Target; Start; End; MouseDown; Error; Browser; OS; Invisible; Block;\n");
            });
        });

        socket.on('moveLog', function (msg) {
            fs.appendFile(moveLog, msg);
            // console.log(msg);
        });

        socket.on('clickLog', function (msg) {
            fs.appendFile(clickLog, msg);
            //console.log(msg);
        });

        socket.on('consoleLog', function (msg) {
            console.log(msg);
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
};

