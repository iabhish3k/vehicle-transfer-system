const router = require('express').Router();

const { getAllVehicleTransferList, createNewVehicleTransferList } = require('../controllers/vehicleTransferController');



router.route('/').get(getAllVehicleTransferList).post( createNewVehicleTransferList)

module.exports = router;
