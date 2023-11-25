const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');

// User model
const User = sequelize.define('User', {
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    FirstName: {
        type: DataTypes.STRING(255),
    },
    LastName: {
        type: DataTypes.STRING(255), 
    },
}, {
    tableName: 'User', // Specify the table name
    timestamps: false, // Disable timestamps
});

module.exports = User;