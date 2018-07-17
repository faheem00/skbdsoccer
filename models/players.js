const Sequelize = require('sequelize');
var database = require('../config/database');

const Players = database.define('players',{
	id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
	name: Sequelize.STRING(100),
	base_price: Sequelize.INTEGER ,
	position: Sequelize.ENUM('gk', 'def', 'mid', 'str'),
	is_captain: Sequelize.BOOLEAN,
	photo: Sequelize.BLOB('medium'),
	team_id: Sequelize.INTEGER
},{timestamps: false});

Players.hasOne(require('./auction_event'),{as:'auction_event',foreignKey:'player_id'});

module.exports = Players;