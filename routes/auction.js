var express = require('express');
var router = express.Router();
const basicAuth = require('express-basic-auth');
let users = {};
users[process.env.AUCTION_USERNAME] = process.env.AUCTION_PASSWORD;

/* AUTH for route */
router.use('/', basicAuth({
    users: users,
    challenge: true,    
}))

/* GET home page. */
router.get('/', function(req, res, next) {	
  	res.render('auction/index');
});

module.exports = router;