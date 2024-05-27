const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get detail for an inventory item
 * ************************** */
async function getDetailByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`, [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getdetailbyinvid error " + error)
  }
}

/* *****************************
*   Add new classification
* *************************** */
async function addClassification(classification_name){
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Add new inventory
* *************************** */
async function addInventory( classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color ){
  try {
    const sql = "INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color])
  } catch (error) {
    return console.error
  }
}

/* *****************************
*   Update inventory data
* *************************** */
async function updateInventory( inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id ){
  try {
    const sql = "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data =  await pool.query(sql, [inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, classification_id, inv_id])
    return data.rows[0]
  } catch (error) {
    return console.error("model error: " + error)
  }
}

/* *****************************
*   Delete inventory data
* *************************** */
async function deleteInventory( inv_id ){
  try {
    const sql = "DELETE FROM inventory WHERE inv_id = $1"
    console.log(`TEST 101: ${sql}`)
    console.log(`TEST 102: ${inv_id}`)
    const data =  await pool.query(sql, [inv_id])
    return data
  } catch (error) {
    new Error("Delete Inventory Error")
  }
}

/* ***************************
 *  Add item to wishlist
 * ************************** */
async function addToWishlist(account_id, inv_id) {
  try {
    const sql = "INSERT INTO wishlist (account_id, inv_id) VALUES ($1, $2) RETURNING *";
    return await pool.query(sql, [account_id, inv_id]);
  } catch (error) {
    console.error("Error adding to wishlist: " + error);
  }
}

/* ***************************
 *  Get wishlist by user_id
 * ************************** */
async function getWishlistById(account_id) {
  try {
    const sql = `
      SELECT i.inv_id, i.inv_make, i.inv_model, i.inv_year, i.inv_price, i.inv_thumbnail 
      FROM wishlist w 
      JOIN inventory i ON w.inv_id = i.inv_id 
      WHERE w.account_id = $1`;
    const data = await pool.query(sql, [account_id]);
    return data.rows;
  } catch (error) {
    console.error("Error retrieving wishlist: " + error);
  }
}

/* ***************************
 *  Delete item from wishlist
 * ************************** */
async function deleteFromWishlist(account_id, inv_id) {
  try {
    const sql = `DELETE FROM wishlist WHERE account_id = $1 AND inv_id = $2 RETURNING *`;
    const result = await pool.query(sql, [account_id, inv_id]);
    return result;
  } catch (error) {
    console.error("Error in deleteFromWishlist:", error);
    return null;
  }
};

module.exports = {getClassifications, getInventoryByClassificationId, getDetailByInvId, addClassification, addInventory, updateInventory, deleteInventory, addToWishlist, getWishlistById, deleteFromWishlist};
