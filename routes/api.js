var express = require('express');
var router = express.Router();
var apicontroller = require('../controllers/apicontroller');
const createError = require('http-errors');

router.use((req,res,next)=>{	
	if(req.session.authenticated)
		next();
	else next(createError(401));
});

/* GET home page. */
router.get('/',apicontroller.get_api);

/** GET All players */
router.get('/players',apicontroller.get_players);

/** GET All auction events */
router.get('/auction_events',apicontroller.get_auction_events);

/** POST create auction event */
router.post('/auction_events',express.json(),apicontroller.post_auction_events);

/** PUT update auction event */
router.put('/auction_events',express.json(),apicontroller.put_auction_events);

/** DELETE update auction event */
router.delete('/auction_events',express.json(),apicontroller.delete_auction_events);

/** GET All teams */
router.get('/teams',apicontroller.get_teams);

module.exports = router;