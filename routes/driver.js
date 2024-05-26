const router = require('express').Router();


const multer = require('multer');
const { createNewDriver, getAllDriverList } = require('../controllers/driverController');
const upload = multer({ dest: 'uploads/' });

router.route('/').get(getAllDriverList)
.post(upload.single('profile_photo'),createNewDriver)

module.exports = router;

