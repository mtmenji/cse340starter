// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const accountController = require("../controllers/accountController")
const wishController = require("../controllers/wishlistController")
const regValidate = require('../utilities/classification-validation')
const regValidate1 = require('../utilities/inventory-validation')


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInvId);
router.get("/", accountController.checkIfEmployed, invController.buildManagementView);
router.get("/add-classification", accountController.checkIfEmployed, invController.buildAddClassificationView);
router.get("/add-inventory", accountController.checkIfEmployed, invController.buildAddInventoryView);
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))
router.get("/edit/:invId", accountController.checkIfEmployed, utilities.handleErrors(invController.buildEditInventoryView)) //Edit Inventory Page
router.get("/delete/:invId", accountController.checkIfEmployed, utilities.handleErrors(invController.buildDeleteInventoryView)) //Delete inventory item
router.get("/wishlist", utilities.checkLogin, utilities.handleErrors(wishController.buildWishlistView))


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

// Process the inventory update
router.post(
    '/edit-inventory/',
    regValidate1.inventoryRules(),
    regValidate1.checkUpdateData,
    utilities.handleErrors(invController.updateInventory))

// Process the inventory delete
router.post(
    '/delete-confirm/',
    utilities.handleErrors(invController.deleteInventory))

// Process the wish list addition
router.post(
    '/wishlist/add',
    utilities.handleErrors(wishController.addToWishlist)
)

// Delete an item from the wish list
router.post(
    '/wishlist/delete',
    utilities.handleErrors(wishController.deleteFromWishlist)
)

module.exports = router;