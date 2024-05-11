const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
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

  module.exports = {getClassifications, getDetailByInvId};