const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


// Needed Resources 
const express = require("express")
const router = new express.Router()
const index = require("../utilities/index")
const accountController = require("../controllers/accountController")

router.get("/login", accountController.buildLogin);
router.get("/registration", accountController.buildRegistration);
// Process the registration data
router.post(
    "/registration",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )



module.exports = router;