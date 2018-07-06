const Sequelize = require('sequelize');
var database = require('../config/database');

const Matches = database.define('matches',{
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    home_team_id: {type: Sequelize.INTEGER},
    away_team_id: {type: Sequelize.INTEGER},
    start_time: {type: Sequelize.DATE},
    location: {type: Sequelize.STRING(40)},
    is_final: {type: Sequelize.BOOLEAN},
    home_team_score: {type: Sequelize.TINYINT},
    away_team_score: {type: Sequelize.TINYINT},
    winner: {type: Sequelize.TINYINT},
    mom: {type: Sequelize.TINYINT},
},{tableName: 'matches',timestamps:false});

Matches.belongsTo(require("./teams"),{as:'home_team',foreignKey: 'home_team_id'});
Matches.belongsTo(require("./teams"),{as:'away_team',foreignKey: 'away_team_id'});
Matches.belongsTo(require("./players"),{as:'man_of_match',foreignKey: 'mom'});
Matches.hasMany(require('./goals'),{as:'goals',foreignKey: 'match_id'});

module.exports = Matches;