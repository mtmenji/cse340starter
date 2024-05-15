const utilities = require("../utilities/")

// Needed Resources 
const express = require("express")
const router = new express.Router()
const index = require("../utilities/index")
const accountController = require("../controllers/accountController")

router.get("/login", accountController.buildLogin);
router.get("/registration", accountController.buildRegistration);
router.post('/registration', utilities.handleErrors(accountController.registerAccount))



module.exports = router;