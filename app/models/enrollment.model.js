const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const Course = require('./courses.model');
const User = require('./users.model')

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


Enrollment.belongsTo(Course, { foreignKey: 'CourseID' });
Enrollment.belongsTo(User, { foreignKey: 'UserID' });
module.exports = Enrollment;