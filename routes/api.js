var express = require('express');
var router = express.Router();
const apicontroller = require('../controllers/apicontroller');
const createError = require('http-errors');

const authenticate = (req,res,next)=>{	
	if(req.session.authenticated)
		next();
	else next(createError(401));
};

/* GET home page. */
//router.get('/',apicontroller.get_api);

/** GET All players */
router.get('/players',apicontroller.get_players);

/** GET All auction events */
router.get('/auction_events',apicontroller.get_auction_events);

/** POST create auction event */
router.post('/auction_events',authenticate,express.json(),apicontroller.post_auction_events);

/** PUT update auction event */
router.put('/auction_events',authenticate,express.json(),apicontroller.put_auction_events);

/** DELETE update auction event */
router.delete('/auction_events',authenticate,express.json(),apicontroller.delete_auction_events);

/** GET All teams */
router.get('/teams',apicontroller.get_teams);

/** GET points table */
router.get('/points_table',apicontroller.get_points_table);

/** GET matches */
router.get('/matches', apicontroller.get_matches);

/** GET match results */

router.get('/results',apicontroller.get_match_results);

module.exports = router;