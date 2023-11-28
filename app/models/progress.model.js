const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const User = require('./users.model'); 
const Lesson = require('./lesson.model'); 

const StudentProgress = sequelize.define('StudentProgress', {
    ProgressID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    LessonID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'StudentProgress',
    timestamps: false,
});

StudentProgress.belongsTo(User, { foreignKey: 'UserID' });
StudentProgress.belongsTo(Lesson, { foreignKey: 'LessonID' });

module.exports = StudentProgress;
