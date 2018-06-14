var express = require('express');
var router = express.Router();
const basicAuth = require('express-basic-auth');
let users = {};
users[process.env.AUCTION_USERNAME] = process.env.AUCTION_PASSWORD;

/* GET home page with authentication. */
router.get('/', basicAuth({
    users: users,
    challenge: true,    
}),function(req, res, next) {	
	if(!req.session.authenticated){
		req.session.authenticated = true;
	}
  	res.render('auction/index');
});

/* GET auction track */
router.get('/track',(req, res, next)=>{
	res.render('auction/track');
});

module.exports = router;