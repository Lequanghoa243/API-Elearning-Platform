
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const Course = require('./courses.model');
const Path = require('./paths.model')
const CoursePath = sequelize.define('CoursePath', {
    CoursePathID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    CourseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PathID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    OrderC: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'CoursePath',
    timestamps: false,
});
CoursePath.belongsTo(Course, { foreignKey: 'CourseID' });
CoursePath.belongsTo(Path,{foreignKey: 'PathID'})
module.exports = CoursePath;

