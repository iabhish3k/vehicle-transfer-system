const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');
const Driver = require('./driver'); // Import Driver model
const Vehicle = require('./vehicle'); // Import Vehicle model

const VehicleTransfer = sequelize.define('VehicleTransfer', {
    vehicle_number: { type: DataTypes.STRING, references: { model: Vehicle, key: 'vehicle_number' } },
    from_driver_id: { type: DataTypes.INTEGER, references: { model: Driver, key: 'id' } },
    to_driver_id: { type: DataTypes.INTEGER, references: { model: Driver, key: 'id' } },
    transfer_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Define associations
VehicleTransfer.belongsTo(Driver, { as: 'fromDriver', foreignKey: 'from_driver_id' });
VehicleTransfer.belongsTo(Driver, { as: 'toDriver', foreignKey: 'to_driver_id' });

// Define association with Vehicle model
VehicleTransfer.belongsTo(Vehicle, { foreignKey: 'vehicle_number', targetKey: 'vehicle_number' });

module.exports = VehicleTransfer;
