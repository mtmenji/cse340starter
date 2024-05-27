const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const wishlistCont = {};

/* ***************************
 *  Add item to wishlist
 * ************************** */
wishlistCont.addToWishlist = async function (req, res, next) {
  const account_id = res.locals.accountData.account_id;
  const { inv_id } = req.body;

  const result = await invModel.addToWishlist(account_id, inv_id);

  if (result) {
    req.flash("notice", "Item added to wishlist successfully.");
    console.log("wishlistController line 17 test: Success Wishlist Add")
  } else {
    req.flash("notice", "Failed to add item to wishlist.");
    console.log("wishlistController line 20 test: Failed Wishlist Add")
  }

  res.redirect(`/inv/detail/${inv_id}`);
};

/* ***************************
 *  Build wishlist view
 * ************************** */
wishlistCont.buildWishlistView = async function (req, res, next) {
  const account_id = res.locals.accountData.account_id;
  const data = await invModel.getWishlistById(account_id);
  let nav = await utilities.getNav();

  res.render("./inventory/wishlist", {
    title: "My Wishlist",
    nav,
    data,
    errors: null,
  });
};


/* ***************************
 *  Delete wishlist item
 * ************************** */
wishlistCont.deleteFromWishlist = async function (req, res, next) {
  const account_id = res.locals.accountData.account_id;
  const { inv_id } = req.body;

  console.log(`TEST wishlistController.js Line 50: Account ID - ${account_id}`);
  console.log(`TEST wishlistController.js Line 51: Inventory ID - ${inv_id}`);

  const result = await invModel.deleteFromWishlist(account_id, inv_id);

  if (result) {
    req.flash("notice", "Item removed from wishlist successfully.");
    console.log("wishlistController line 33 test: Success Wishlist Delete");
  } else {
    req.flash("notice", "Failed to remove item from wishlist.");
    console.log("wishlistController line 36 test: Failed Wishlist Delete");
  }

  res.redirect(`/inv/wishlist`);
};

module.exports = wishlistCont;