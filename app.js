var tmi = require('tmi.js');

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
        password: 'oauth:orrpsxxjr15pkz3v75cdw0cmsj53xj'
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
});