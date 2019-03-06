const
    io = require("socket.io-client"),
	ioClient = io.connect("http://192.168.1.3:3000");

const { exec } = require('child_process');

function intervalFunc(){
  exec('./iw_parse-master/iw_parse.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
	
    var jsonObj = JSON.parse(`${stdout}`);
    ioClient.emit('ssid', jsonObj);
  });
};

setInterval(intervalFunc, 5000);
