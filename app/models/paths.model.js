const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');

const Path = sequelize.define('LearningPath', {
    PathID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Path: {
        type: DataTypes.STRING(255),
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
