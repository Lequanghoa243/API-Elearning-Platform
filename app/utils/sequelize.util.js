const Sequel = require('sequelize');

const MySQLSequel = new Sequel(
    'e_learning',  // Database name
    'root',         // Database username
    null,           // Database password (set to null if there is no password)
    {
        host: '127.0.0.1',  // Database host
        port: '3306',        // Database port
        dialect: 'mysql',    // Database dialect
        logging: false,
        define: {
            underscored: false,
        },
        pool: {
            max: 10,                             
            min: 0,
            acquire: 30000,
            idle: 100000,
        },
    },
);

module.exports = MySQLSequel;
