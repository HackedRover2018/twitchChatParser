"use strict";
var tmi = require('tmi.js');
var http = require('http');
var config = require('./config.json');


var testData = ['a','s','w','d','s','a','w','w','s','a','d','w'];
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
});

client.on("chat", function (channel, user, message, self) {
    if(message.toLowerCase() == "help"){
        client.action("spear_rover",user["display-name"] + ": a = left, w = forward, d = right, s = backward")
    }else{
        unreadMessages.push(message);
    }
    
    
});


//create a server object:
http.createServer(function (req, res) {
  res.write(JSON.stringify(testData));
  unreadMessages.length = 0;
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080