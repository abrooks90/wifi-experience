const
    io = require("socket.io-client"),
	ioClient = io.connect("http://192.168.1.10:3001");

const { exec } = require('child_process');

function intervalFunc(){
  exec('./iw_parse-master/iw_parse.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
	console.log(`${stdout}`)
    ioClient.emit('ssid', `${stdout}`);
  });
};

setInterval(intervalFunc, 5000);
