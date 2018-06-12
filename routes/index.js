var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {	
  	res.render('index', { title: 'Our World' });
});

/* GET player list page */
router.get('/players',function(req, res, next) {
	let Player = require('../models/players');
	return Player.findAll({where:{is_captain:false}}).then(players =>{
		players = players.map(player => {
			let position = player.position;
			switch(position){
				case 'def':
					player.position = 'Defender';
					break;
				case 'gk':
					player.position = 'Goalkeeper';
					break;
				case 'mid':
					player.position = 'Midfielder';
					break;
				case 'str':
					player.position = 'Striker';
					break;
			}
			player.photo = player.photo.toString('base64');
			return player;
		});		
		let data = {};
		data['goalkeepers'] = players.filter(player => player.position == 'Goalkeeper');
		data['defenders_5'] = players.filter(player => player.position == 'Defender' && player.base_price == 5);
		data['defenders_10'] = players.filter(player => player.position == 'Defender' && player.base_price == 10);
		data['midfielders_5'] = players.filter(player => player.position == 'Midfielder' && player.base_price == 5);
		data['midfielders_10'] = players.filter(player => player.position == 'Midfielder' && player.base_price == 10);
		data['strikers_5'] = players.filter(player => player.position == 'Striker' && player.base_price == 5);
		data['strikers_10'] = players.filter(player => player.position == 'Striker' && player.base_price == 10);
		data['query'] = req.query;
		// return res.send(data);
		return res.render('players', data);
	})
});

module.exports = router;
