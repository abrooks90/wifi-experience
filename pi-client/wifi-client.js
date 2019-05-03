const
    io = require("socket.io-client"),
	// Connection to socket that's running on our database server
	ioClient = io.connect("http://192.168.1.10:3001/pi");

const { exec } = require('child_process');

function intervalFunc(){
	// Executes the iw_parse.py module that runs iwlist and parses the output
  exec('./iw_parse-master/iw_parse.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
	console.log(`${stdout}`);
	console.log(JSON.parse(`${stdout}`));
	
	// Emit stdout data from the iw_parse.py
    ioClient.emit('ssid', `${stdout}`);
  });
};

var timer;

ioClient.on('disconnect', function(socket) {
	console.log('Disconnected: Stop sending data until reconnect...');
	clearInterval(timer);
});

ioClient.on('connect', function(socket) {
	console.log('Connected: Sending data to socket...');
	timer = setInterval(intervalFunc, 5000);
});