const Sequelize = require('sequelize');

exports.get_api = (req, res, next) => {
	let QuestionAnswer = require('../models/question_answers');
	console.log(QuestionAnswer);
	return QuestionAnswer.findAll().then(question_answers => {
		// return res.render('api', { answers: question_answers });
		return res.send(question_answers);
	});	
};

exports.get_players = (req,res,next) => {
	let Players = require('../models/players');
	return Players.findAll({
		attributes: { exclude: ['photo'] }
	}).then(players => {
		return res.json(players);
	});
};

exports.get_auction_events = (req,res,next) => {
	let AuctionEvent = require('../models/auction_event');
	return AuctionEvent.findAll({
		include: [
			{model:require('./../models/players'),attributes:['name','position']},
			{model:require('./../models/teams'),attributes:['team_name'],include:[
				{model:require('./../models/players'),where:{is_captain:true},attributes:['name']}
			]}
		]
	}).then(events => {
		return res.json(events);
	});
};

exports.post_auction_events = (req,res,next) => {
	let AuctionEvent = require('../models/auction_event');
	let errors = [];
	//validate fields
	let Players = require('../models/players');
	let Teams = require('../models/teams');
	if(!(req.body.player_id && Players.count({where:{'id':req.body.player_id}}).then(c=>c))){
		errors.push('player id not valid');
	}
	if(!(req.body.team_id && Teams.count({where:{'id':req.body.team_id}}).then(c=>c))){
		errors.push('team id not valid');
	}
	if(isNaN(req.body.price) || !(req.body.price > 0 && req.body.price <= 145)){
		errors.push('price not valid');	
	}	
	if(errors.length > 0)
		res.status(422).json({errors:errors});
	else{
		//TODO: check if budget exceeds for captain
		return AuctionEvent.findOne({
			attributes:[
				[Sequelize.fn('SUM',Sequelize.col('price')),'price_sum'],
				[Sequelize.fn('COUNT',Sequelize.col('*')),'player_sum'],
			],
			where: {'team_id':req.body.team_id}
		}).then(a=>a.get({ plain: true })).then(auction_event=>{
			let bought_players = auction_event.player_sum;
			let remaining_budget = 200 - auction_event.price_sum - req.body.price;
			console.log('remaining budget is ' + remaining_budget);		
			console.log('bought player is ' + bought_players);
			if(bought_players >= 12)
				throw new Error('Player exceeded for the team');
			else if(remaining_budget <= 0)
				throw new Error('No more budget left for the team');
			
			let minimum_amount_needed = (12 - (bought_players+ 1)) * 5;
			if (remaining_budget < minimum_amount_needed)
				throw new Error('The team cannot afford the player');
			else return AuctionEvent.create({
				price: req.body.price,
				player_id: req.body.player_id,
				team_id: req.body.team_id
			}).then(player=>player);
		}).catch(function(e) {
			return res.status(422).json({errors:[e.message]});
		});		
	}
};

exports.put_auction_events = (req,res,next) => {
	let AuctionEvent = require('../models/auction_event');
	let errors = [];
	//validate fields
	let Players = require('../models/players');
	let Teams = require('../models/teams');
	let update_fields = {};
	if(!req.body.id){
		errors.push('id not valid');
	}
	if(req.body.player_id){
		if(!(Players.count({where:{'id':req.body.player_id}}).then(c=>c))){
			errors.push('player id not valid');
		}
		update_fields.player_id = req.body.player_id;
	}
	if(req.body.team_id){
		if(!(Teams.count({where:{'id':req.body.team_id}}).then(c=>c))){
			errors.push('team id not valid');
		}
		update_fields.team_id = req.body.team_id;
	}
	if(req.body.price){
		if(isNaN(req.body.price) || !(req.body.price > 0 && req.body.price <= 145)){
			errors.push('price not valid');	
		}
		update_fields.price = req.body.price
	}
	//TODO: check if budget exceeds for captain
	if(errors.length > 0)
		res.status(422).json({errors:errors});
	else{
		return AuctionEvent.findOne({
			attributes:[
				[Sequelize.fn('SUM',Sequelize.col('price')),'price_sum'],
				[Sequelize.fn('COUNT',Sequelize.col('*')),'player_sum'],
			],
			where: {'team_id':req.body.team_id}
		}).then(a=>a.get({ plain: true })).then(auction_event=>{
			AuctionEvent.findOne({
				attributes: ['price'],
				where: {id:req.body.id}
			}).then(a=>a.get({ plain: true })).then(nested_auction_event=>{
				if(nested_auction_event == null)
					throw new Error('The auction event does not exist');
				let bought_players = auction_event.player_sum;
				let remaining_budget = 200 - auction_event.price_sum - (req.body.price - nested_auction_event.price);					
				console.log('remaining budget is ' + remaining_budget);		
				console.log('bought player is ' + bought_players);
				if(remaining_budget <= 0)
					throw new Error('No more budget left for the team');
				
				let minimum_amount_needed = (12 - bought_players) * 5;
				if (remaining_budget < minimum_amount_needed)
					throw new Error('The team cannot afford the player');
				else return AuctionEvent.update(update_fields,{where:{'id':req.body.id}})
				.spread((ac,ar)=>res.send(ac.toString()));
			}).catch(function(e) {
				return res.status(422).json({errors:[e.message]});
			});			
		});			
	}
}

exports.delete_auction_events = (req,res,next) => {
	let AuctionEvent = require('../models/auction_event');
	console.log(req.body);
	return AuctionEvent.destroy({where:{'id':req.body.id}}).then(ac=>ac > 0 ? res.status(200).end() : res.status(422).end());
}

exports.get_teams = (req,res,next) => {
	let Teams = require('../models/teams');
	return Teams.findAll({
		include: [
			{model:require('./../models/players'),where:{is_captain:true},attributes:['name','position']}
		]
	}).then(teams => {
		return res.json(teams);
	});
};