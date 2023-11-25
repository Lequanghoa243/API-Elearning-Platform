const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');


const Lesson = sequelize.define('Lesson', {
    LessonID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    CourseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Content: {
        type: DataTypes.TEXT,
    },
    LessonOrder: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'Lesson',
    timestamps: false,
});

module.exports = Lesson;