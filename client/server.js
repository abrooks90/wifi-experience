const express = require('express');
const app = express();
const io = require('socket.io'), server = io.listen(3001);
const port = process.env.PORT || 4000;
const pg = require ('pg');

console.log(server);

app.listen(port, () => console.log(`Listening for web connections on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

var path = require("path");

app.use(express.static(path.join(__dirname, 'build')));

//Route for index page when someone requests a connection in the browser
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//Instantiate connection with PostgreSQL -- This needs to be changed to environmental variables at some point.
var con_string = 'tcp://node:capstone@localhost/wifi_experience';
var pg_client = new pg.Client(con_string);
pg_client.connect();

// Listens for the pg_notify from PostgreSQL when a record is inserted into the SSID table
var query = pg_client.query('LISTEN live_update')
pg_client.on('notification', function(data){
	let queryString = {
		text: `SELECT * FROM realtime_view`,
	};
	
	pg_client.query(queryString, function(err, res){
		if (err) return console.error(err);
		console.log(res.rows);
		let data = res.rows;
		data = JSON.stringify(data);
		
		/*
		data.forEach(row =>{
		console.log(`Wireless: ${row.row_to_json.wireless[0]}`)		
		})
		*/
		
		reactClient.emit('FromAPI', data);
	});
		
		
});


//Function to run Postgres queries
function pgsql(queryString){
	pg_client.query(queryString, function(err, res){
		if (err) return console.error(err);
		console.log(res);
});
}


// Socket IO Error Handling
server.on('error', function (err) {
    if (err.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
            throw err
        }
});

// Create namespaces for the Pi and React clients
var piClient = server.of('/pi');
var reactClient = server.of('/react');

piClient.on('connection', (socket) => {
	console.log("Pi Connected");
	
	socket.on('ssid', function(data){
		
		// Create the INSERT statement and remove new lines amongst other things
		let queryString = `INSERT INTO wifi_experience.ssid (ssid) VALUES ('${data}')`;
		queryString = queryString.replace(/(\r\n|\n|\r)/gm,"");
		pgsql(queryString);
		
	});
});

reactClient.on('connection', function(socket) {
   console.log('Someone Connected');
});


