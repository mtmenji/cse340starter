// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')



router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));
router.get("/login", accountController.buildLogin);
router.get("/registration", accountController.buildRegistration);
router.get("/account-update/:account_id", accountController.buildAccountUpdate);




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

// Process the logout attempt
router.get(
  '/logout',
  (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

// Process the account info update
router.post(
  "/account-update",
  utilities.checkLogin,
  utilities.handleErrors(accountController.updateAccount)
);

// Process the account password update
router.post(
  "/change-password",
  utilities.checkLogin,
  utilities.handleErrors(accountController.changePassword)
);



module.exports = router;