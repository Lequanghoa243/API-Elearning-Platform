const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');


const Course = sequelize.define('Course', {
    CourseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
    },
    NumberofLesson: {
        type: DataTypes.INTEGER,
    },
    LearningTime: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'Course',
    timestamps: false,
});

module.exports = Course;