const Sequelize = require('sequelize');
var database = require('../config/database');

var Teams = database.define('teams',{
	id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
	team_name: Sequelize.STRING(50),
	team_jersey_color: Sequelize.STRING(15),
	captain_id: {type: Sequelize.INTEGER},
},{timestamps: false});

Teams.belongsTo(require('./players'),{foreignKey: 'captain_id'});

module.exports = Teams;