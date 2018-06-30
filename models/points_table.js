const Sequelize = require('sequelize');
var database = require('../config/database');

const PointsTable = database.define('points_table',{
    team_name: {type: Sequelize.STRING(50), primaryKey: true},
    win_count: Sequelize.INTEGER,
    lose_count: Sequelize.INTEGER,
    draw_count: Sequelize.INTEGER,
    goals_for: Sequelize.DECIMAL(5,2),
    goals_against: Sequelize.DECIMAL(5, 2),
    goal_difference: Sequelize.DECIMAL(5, 2),
    points: Sequelize.INTEGER
},{tableName: 'points_table',timestamps:false});

module.exports = PointsTable;