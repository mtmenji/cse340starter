const detModel = require("../models/detail-model")
const utilities = require("../utilities/")

const detCont = {}

/* ***************************
 *  Build inventory by detail view
 * ************************** */
detCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await detModel.getDetailByInvId(inv_id)
  const grid = await utilities.buildDetailGrid(data)
  let nav = await utilities.getNav()
  res.render("./inventory/classification", {
    title: "Details",
    nav,
    grid,
    error: null,
  })
}

module.exports = detCont