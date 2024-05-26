const router = require('express').Router();
const multer = require('multer');
const { getAllVehicleList, createNewVehicle } = require('../controllers/vehicleController');
const upload = multer({ dest: 'uploads/' });


router.route('/').get(getAllVehicleList).post(upload.fields([
    { name: 'puc_certificate', maxCount: 1 },
    { name: 'insurance_certificate', maxCount: 1 }
]), createNewVehicle)



module.exports = router;
