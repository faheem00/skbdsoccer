const Sequelize = require('sequelize');
var database = require('../config/database');

const Goals = database.define('goals',{
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    match_id: {type: Sequelize.INTEGER},
    scorer_id: {type: Sequelize.INTEGER},
},{tableName: 'goals',timestamps:false});

Goals.belongsTo(require("./players"),{foreignKey: 'scorer_id'});

module.exports = Goals;