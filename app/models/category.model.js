const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const Course = require('../models/Courses.model')

const Category = sequelize.define('Category', {
    CategoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'Category',
    timestamps: false,
});


module.exports = Category;
