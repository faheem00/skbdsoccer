const Sequelize = require('sequelize');
var database = require('../config/database');

module.exports = database.define('players',{
	id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
	name: Sequelize.STRING(100),
	base_price: Sequelize.INTEGER ,
	position: Sequelize.ENUM('gk', 'def', 'mid', 'str'),
	is_captain: Sequelize.BOOLEAN,
	photo: Sequelize.BLOB('medium')
},{timestamps: false});