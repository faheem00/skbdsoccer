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
	console.log("connected to redis publisher");
});
module.exports = client;