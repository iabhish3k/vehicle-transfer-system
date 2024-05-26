const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const Vehicle = sequelize.define('Vehicle', {
    vehicle_number: { type: DataTypes.STRING, primaryKey: true },
    vehicle_type: { type: DataTypes.STRING },
    puc_certificate: { type: DataTypes.STRING },
    insurance_certificate: { type: DataTypes.STRING }
});

module.exports = Vehicle;
