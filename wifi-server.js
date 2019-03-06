const
    io = require('socket.io'),
	server = io.listen(3000);
	
server.on('error', function (err) {
    if (err.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
            throw err
        }
});

server.on('connection', (socket) => {
    console.log("Client Connected");
	socket.on('ssid', function(data){
		console.log(data);
	});
});