// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const detController = require("../controllers/detController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", detController.buildByInvId);
router.get("/", invController.buildManagementView);
router.get("/add-classification", invController.buildAddClassificationView);
router.get("/add-inventory", invController.buildAddInventoryView);


module.exports = router;