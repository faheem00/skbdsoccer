const Sequelize = require('sequelize');
var database = require('../config/database');

module.exports = database.define('question_answers',{
	hash_id: {type: Sequelize.STRING(64), primaryKey: true},
	question: Sequelize.TEXT,
	answers: Sequelize.JSON,
	correct_answer_id: Sequelize.INTEGER
},{timestamps: false});