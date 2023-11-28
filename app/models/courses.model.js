const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const Category = require('./category.model');


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
    LearningTime: {
        type: DataTypes.INTEGER,
    },
    CategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Course',
    timestamps: false,
});

Course.belongsTo(Category, { foreignKey: 'CategoryID' });

module.exports = Course;