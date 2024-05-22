const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


// Needed Resources 
const express = require("express")
const router = new express.Router()
const index = require("../utilities/index")
const accountController = require("../controllers/accountController")


router.get("/", accountController.buildAccountManagement);
router.get("/login", accountController.buildLogin);
router.get("/registration", accountController.buildRegistration);

// Process the registration data
router.post(
    "/registration",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  (req, res, next) => {
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    next();
  },
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router;