const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Add Inventory Data Validation Rules
  * ********************************* */
validate.inventoryRules = () => {
    return [
        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isAlpha()
        .withMessage("Please only use letters for the make."),
        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isAlpha()
        .withMessage("Please only use letters for the model."),
        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Please only use numbers for the year."),
        body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Please only use numbers for the price."),
        body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Please only use numbers for the mileage."),
        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isAlpha()
        .withMessage("Please only use letters for the color."),
    ]
  }

/* ******************************
 * Check data and return errors or continue to process inventory addition
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let select = await utilities.buildClassificationList(classification_id, null)
      res.render("inventory/add-inventory", {
        errors,
        title: "Add Inventory",
        nav,
        select,
        locals: {
          classification: classification_id,
          make: inv_make,
          model: inv_model,
          year: inv_year,
          description: inv_description,
          price: inv_price,
          miles: inv_miles,
          color: inv_color,
        }
      })
      console.log(`TEST -- Make: ${inv_make}`)
      console.log(`TEST -- Classification: ${classification_id}`)
      return
    }
    next()
}
  
module.exports = validate