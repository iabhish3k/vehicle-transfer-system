const Vehicle = require("../models/vehicle");

exports.getAllVehicleList = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.createNewVehicle = async (req, res, next) => {
  try {
    const { vehicle_number, vehicle_type } = req.body;
    const puc_certificate =
    req.files["puc_certificate"] && req.files["puc_certificate"][0].path;
    const insurance_certificate =
    req.files["insurance_certificate"] &&
      req.files["insurance_certificate"][0].path;
    const vehicle = await Vehicle.create({
      vehicle_number,
      vehicle_type,
      puc_certificate,
      insurance_certificate,
    });

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
