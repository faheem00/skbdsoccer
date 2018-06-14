require('dotenv').config();
console.log("Server started");
var Msg = '';
const WebSocket = require('ws');

const sendMessage = function(ws,channel,message){
	if(ws.readyState === WebSocket.OPEN)
		ws.send(channel + '|' + message);
}

var WebSocketServer = WebSocket.Server
    , wss = new WebSocketServer({port: 8100});
    wss.on('connection', function(ws) {
    	const redis = require("redis");
    	const client = redis.createClient({
    	    	host: process.env.REDIS_HOST,
    	    	port: process.env.REDIS_PORT,
    	    	password: process.env.REDIS_PASSWORD
    	});
    	client.on("error", function (err) {
    	    console.log("Error " + err);
    	});
    	client.on("connect", function() {
    		console.log("connected to redis subscriber");
    	});
    	ws.on('close', function close() {
    	  console.log('redis subscriber disconnected');
    	  client.quit();
    	});
    	//subscribe to all events
    	client.psubscribe('event*');
    	//handle redis messages
    	client.on('pmessage',(pattern,channel,message) => {
    		if(pattern == 'event*'){
    			if(channel == 'event:general')
    				sendMessage(ws,'general',message);    			
    			else if(channel == 'event:create')
    				sendMessage(ws,'create',message);
    		}
    	});
        //ping-pong
        setInterval(function() {
            if(ws.readyState === WebSocket.OPEN){
                console.log('sending ping!');
                ws.ping();
            }
        },20000);
 });