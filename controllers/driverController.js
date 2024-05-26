const Driver = require('../models/driver');



exports.getAllDriverList = async (req, res, next)=>{
    try {
        const drivers = await Driver.findAll();
        res.status(200).json({
            success: true,
            data: drivers,
          });
        
    } catch (error) {
        console.log(error);
    }
}


exports.createNewDriver = async (req, res, next)=>{
    try {

    const { name, phone_number } = req.body;
    const profile_photo = req.file.path;
    const driver = await Driver.create({ name, phone_number, profile_photo });
        

    res.status(200).json({
        success: true,
        data: driver,
      });
    } catch (error) {
        console.log(error);
    }
}