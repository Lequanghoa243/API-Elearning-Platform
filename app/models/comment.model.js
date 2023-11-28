const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const User = require('./users.model');  
const Course = require('./Courses.model');  

const Comment = sequelize.define('Comment', {
    CommentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'UserID',
        },
    },
    CourseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'CourseID',
        },
    },
    Comment: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'Comment',
    timestamps: false,
});

module.exports = Comment;
