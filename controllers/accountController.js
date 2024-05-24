const index = require("../utilities/index")
const utilities = require("../utilities/")
const accModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      error: null,
    })
  }

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegistration(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/registration", {
    title: "Registration",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver account management view
* *************************************** */
async function buildAccountManagement(req, res, next) {
  let nav = await utilities.getNav()
  let accountData = res.locals.accountData
  res.render("account/account-management", {
    title: "Registration",
    nav,
    accountData,
    errors: null,
  })
}

/* ****************************************
*  Deliver update account view
* *************************************** */
async function buildAccountUpdate(req, res, next) {
  let nav = await utilities.getNav();
  let accountId = req.params.id;
  let accountData = await accModel.getAccountById(accountId);
  res.render("account/update-account", {
    title: "Update Account Information",
    nav,
    accountData,
    errors: null,
  });
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/registration", {
      title: "Registration",
      nav,
    })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { email, password } = req.body
  console.log(`TEST TEST TEST 5: ${email}`)
  const accountData = await accModel.getAccountByEmail(email)
  if (!accountData) {
   req.flash("notice", "Please check your credentials and try again.")
   res.status(400).render("account/login", {
    title: "Login",
    nav,
    errors: null,
    email,
   })
  return
  }
  if (await bcrypt.compare(password, accountData.account_password)) {
    delete accountData.account_password
    const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
    return res.redirect("/account/")
  } else {
      req.flash("notice", "Incorrect password. Please try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        email,
      })
  }
}

/* ****************************************
 *  Check if the account is an employee or admin
 * ************************************ */
function checkIfEmployed(req, res, next) {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, function (err, accountData) {
      if (err) {
        req.flash("notice", "Please log in to access this page.");
        res.clearCookie("jwt");
        return res.redirect("/account/login");
      }
      // Check if the account type is Employee or Admin
      if (accountData.account_type === "Employee" || accountData.account_type === "Admin") {
        res.locals.accountData = accountData;
        res.locals.loggedin = true;
        next();
      } else {
        req.flash("notice", "You do not have permission to access this page.");
        return res.redirect("/account/");
      }
    });
  } else {
    req.flash("notice", "Please log in to access this page.");
    res.redirect("/account/login");
  }
}

module.exports = { buildLogin, buildRegistration, registerAccount, buildAccountManagement, accountLogin, checkIfEmployed, buildAccountUpdate }