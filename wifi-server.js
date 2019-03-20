const
    io = require('socket.io'),
	server = io.listen(3000);

var pg = require ('pg');
var con_string = 'tcp://node:JSONInsert!12@localhost/wifi_experience';

var pg_client = new pg.Client(con_string);
pg_client.connect();

	
server.on('error', function (err) {
    if (err.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
            throw err
        }
});

server.on('connection', (socket) => {
    console.log("Client Connected");
	socket.on('ssid', function(data){
		
		var queryString = `INSERT INTO wifi_experience.ssid (ssid) VALUES ('${data}')`

		queryString = queryString.replace(/(\r\n|\n|\r)/gm,"");
		
		pg_client.query(queryString, function(err, data){
			if (err) return console.error(err);
			console.log(data);
		});
	});
});


//select * from wifi_experience.ssid json_each_text