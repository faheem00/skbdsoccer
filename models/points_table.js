const Sequelize = require('sequelize');
var database = require('../config/database');

const PointsTable = database.define('points_table',{
    id: {type: Sequelize.INTEGER, primaryKey: true},
    team_name: Sequelize.STRING(50),
    win_count: Sequelize.INTEGER,
    lose_count: Sequelize.INTEGER,
    draw_count: Sequelize.INTEGER,
    goals_for: Sequelize.INTEGER,
    goals_against: Sequelize.INTEGER,
    goal_difference: Sequelize.INTEGER,
    points: Sequelize.INTEGER
},{tableName: 'points_table',timestamps:false});

module.exports = PointsTable;