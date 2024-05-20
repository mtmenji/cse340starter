const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  let className = ""
  if (data === undefined) {
    className = data[0].classification_name
  }
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    error: null,
  })
}

/* ***************************
 *  Build inventory by detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getDetailByInvId(inv_id)
  const grid = await utilities.buildDetailGrid(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: "Details",
    nav,
    grid,
    error: null,
  })
}

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management View",
    nav,
    error: null,
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Classification Addition
* *************************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(
    classification_name
  )

  let nav = await utilities.getNav()

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added a new classification called ${classification_name}.`
    )
    res.status(201).render("inventory/management", {
      title: "Management View",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the new classification addition failed.")
    res.status(501).render("inventory/management", {
      title: "Management View",
      nav,
      errors: null
    })
  }
}

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  let select = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    select,
    errors: null,
  })
}

/* ****************************************
*  Process Inventory Addition
* *************************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body

  const regResult = await invModel.addInventory(
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added a new inventory item: ${inv_year} ${inv_make} ${inv_model}.`
    )
    res.status(201).render("inventory/management", {
      title: "Management View",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the new inventory addition failed.")
    res.status(501).render("inventory/management", {
      title: "Management View",
      nav,
      errors: null,
    })
  }
}

module.exports = invCont