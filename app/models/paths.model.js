const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');

const Path = sequelize.define('LearningPath', {
    PathID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING(255),
    },
    Description: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'LearningPath',
    timestamps: false,
});

module.exports = Path;
