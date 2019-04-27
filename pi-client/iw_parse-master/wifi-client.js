const net = require('net');
/*let {PythonShell} = require('python-shell')*/
/*var pyshell = new PythonShell('./iw_parse-master/iw_parse.py');*/
let {PythonShell} = require('python-shell')


const { exec } = require('child_process');
var iwlist = exec('./iw_parse-master/iw_parse.py', (error, stdout, stderr) => {
  if (error) {
    /*console.error(`exec error: ${error}`);*/
    return;
  }
  
  console.log(`${stdout}`);
  
});




/*
PythonShell.run('./iw_parse-master/iw_parse.py', null, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', JSON.parse(results));
});
*/
/*
let shell = new PythonShell('./iw_parse-master/iw_parse.py', { mode: 'text '});
shell.stdout.on('data', function (output) {
  var test = String(output);
  console.log(test);
});
*/
/*
var client = new net.Socket();

client.connect(3000, '192.168.1.8', function() {
  
  console.log('connected');

var process = child.spawn("sudo iwlist wlan0 scanning | egrep 'Address:|Frequency|Quality=|ESSID'");
var process = child.spawn('python',['iw_parse.py']);
process.stdout.on('data', (data) => {
console.log(data);
client.write(`stdout: ${data}`);
  });

});
*/