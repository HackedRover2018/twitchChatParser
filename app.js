var tmi = require('tmi.js');
var http = require('http');
var config = require('./config.json');

var unreadMessages = [];

var options = {
    options:{
        debug: true
    },
    connection: {
        cluster: 'aws',
        reconnect: true
    },
    identity:{
        username: 'roverbothacked2018',
        password: config.apiKey
    },
    channels: ['spear_rover']
};

var client = new tmi.client(options);
client.connect();

client.on('connected', function(address,port){
    console.log("Address: " + address + ", Port: " + port);
});

client.on("action", function (channel, userstate, message, self) {
    console.log(message);
    unreadMessages.push(message.toString());
});



//create a server object:
http.createServer(function (req, res) {
    console.log(unreadMessages);
    console.log(JSON.stringify(unreadMessages));
  res.write(JSON.stringify(unreadMessages));
  unreadMessages.length = 0;

  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080