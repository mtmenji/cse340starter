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
 *  Build management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  const grid = await utilities.buildManagementGrid()
  let nav = await utilities.getNav()
  res.render("./inventory/classification", {
    title: "Management View",
    nav,
    grid,
    error: null,
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  const grid = await utilities.buildAddClassificationGrid()
  let nav = await utilities.getNav()
  res.render("./inventory/classification", {
    title: "Add Classification",
    nav,
    grid,
    error: null,
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  const grid = await utilities.buildAddInventoryGrid()
  const dropDownSelect = await utilities.buildClassificationList()
  let nav = await utilities.getNav()
  res.render("./inventory/classification", {
    title: "Add Inventory",
    nav,
    grid,
    dropDownSelect,
    error: null,
  })
}

module.exports = invCont