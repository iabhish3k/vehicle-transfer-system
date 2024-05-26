const express = require("express")
const router = require("express").Router();
const driverRoutes = require("./driver")
const vehicleRoutes = require("./vehicle")
const transferRoutes = require("./transfer")


router.get("/", (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Vechicle Transfer System",
    });
  });



router.use("/api/v1/uploads", express.static('uploads'));

router.use("/api/v1/drivers", driverRoutes);
router.use("/api/v1/vehicles", vehicleRoutes);
router.use("/api/v1/transfers", transferRoutes);

module.exports = router;