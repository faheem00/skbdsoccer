const Sequelize = require('sequelize');
var database = require('../config/database');

var AuctionEvent = database.define('auction_event',{
	id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
	price: Sequelize.INTEGER(3),
	player_id: {type: Sequelize.INTEGER},
	team_id: {type: Sequelize.INTEGER},	
},{tableName: 'auction_event',createdAt : 'created_at',updatedAt : 'updated_at',});

AuctionEvent.belongsTo(require('./players'),{foreignKey: 'player_id'});
AuctionEvent.belongsTo(require('./teams'),{foreignKey: 'team_id'});

module.exports = AuctionEvent;