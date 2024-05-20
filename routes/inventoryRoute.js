// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const regValidate = require('../utilities/classification-validation')
const regValidate1 = require('../utilities/inventory-validation')


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInvId);
router.get("/", invController.buildManagementView);
router.get("/add-classification", invController.buildAddClassificationView);
router.get("/add-inventory", invController.buildAddInventoryView);

// Process the classification addition
router.post(
    '/add-classification',
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification))

// Process the inventory addition
router.post(
    '/add-inventory',
    regValidate1.inventoryRules(),
    regValidate1.checkInventoryData,
    utilities.handleErrors(invController.addInventory))



module.exports = router;