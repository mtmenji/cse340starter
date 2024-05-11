const detModel = require("../models/detail-model")
const utilities = require("../utilities/")

const detCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
detCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await detModel.getDetailByInvId(inv_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

module.exports = detCont