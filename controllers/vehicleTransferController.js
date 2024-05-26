const express = require('express');
const router = express.Router();
const VehicleTransfer = require('../models/vehicleTransfer');
const Driver = require('../models/driver');
const Vehicle = require('../models/vehicle');
const { createNewVehicle } = require('../controllers/vehicleController');

exports.getAllVehicleTransferList = async (req, res, next) => {
    try {
        const transfers = await VehicleTransfer.findAll({
            include: [
                { model: Driver, as: 'fromDriver' },
                { model: Driver, as: 'toDriver' },
                { model: Vehicle }
            ]
        });
      res.status(200).json({
        success: true,
        data: transfers,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  };

  exports.createNewVehicleTransferList = async (req, res, next) => {
    try {
        const { vehicle_number, from_driver_id, to_driver_id } = req.body;
        const transfer = await VehicleTransfer.create({ vehicle_number, from_driver_id, to_driver_id });
        res.status(200).json({
            success: true,
            data: transfer,
          });
    } catch (error) {
        console.log(error);
        next()
    }
  }