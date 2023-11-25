const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');


const Enrollment = sequelize.define('Enrollment', {
    EnrollmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CourseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    EnrollmentDate: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'Enrollment',
    timestamps: false,
});

module.exports = Enrollment;