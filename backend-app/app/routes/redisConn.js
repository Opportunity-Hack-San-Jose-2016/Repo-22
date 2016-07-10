var redis = require('redis');

var redisClient = redis.createClient(6379, "localhost");

redisClient.on('connect', function() {
    console.log('Redis Server connected');
});


module.exports = redisClient;