const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const Driver = sequelize.define('Driver', {
    name: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING },
    profile_photo: { type: DataTypes.STRING }
});

module.exports = Driver;
