const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the detail view HTML
* ************************************ */
Util.buildDetailGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<section id="detail-section">'
    data.forEach(vehicle => { 
      grid += '<h2>' + vehicle.inv_year + " " + vehicle.inv_make + " " + vehicle.inv_model + '</h2>'
      grid +=  '<img src="' + vehicle.inv_image 
      +'" id="vehicle-image" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" />'
      grid += '<div id="more-details">'
      grid += '<p> Description: ' + vehicle.inv_description + '</p>'
      grid += '<p> Color: ' + vehicle.inv_color + '</p>'
      grid += '<p> Mileage: ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
      grid += '<span>Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</section>'
    })
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the management view HTML
* ************************************ */
Util.buildManagementGrid = async function(){
  let grid
  grid = '<section id="management-section"><div id="management-div">'
  grid += '<ul><li><a href="">Add New Classification</a></li>'
  grid += '<li><a href="">Add New Inventory</a></li></ul></div></section>'
  return grid
}

/* **************************************
* Build the add classification view HTML
* ************************************ */
Util.buildAddClassificationGrid = async function(){
  let grid
  grid = '<section id="addClassification-section"><form>'
  grid += '<label for="classification">Add Classification:</label>'
  grid += '<input type="text" id="classification" name="classification"></input>'
  grid += '<span>Note: You can not use spaces or special characters.</span>'
  grid += '<button type="submit">SUBMIT</button>'
  grid += '</form></section>'
  return grid
}

/* **************************************
* Build the classification list drop down
* ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* **************************************
* Build the add inventory view HTML
* ************************************ */
Util.buildAddInventoryGrid = async function(){
  let grid
  grid = '<section id="addInventory-section"><form>'
  grid += '<label for="make">Enter Make:</label><input type="text" id="make" name="make"></input>'
  grid += '<label for="make">Enter Model:</label><input type="text" id="model" name="model"></input>'
  grid += '<label for="make">Enter Year:</label><input type="number" id="year" name="year" maxLength="4"></input>'
  grid += '<label for="make">Enter Description:</label><textarea id="description" name="description" rows="4" cols="50"></textarea>'
  grid += '<label for="make">Image Path:</label><input type="text" id="image" name="image" value="/images/vehicles/no-image.png"></input>'
  grid += '<label for="make">Thumbnail Path:</label><input type="text" id="thumbnail" name="thumbnail" value="/images/vehicles/no-image.png"></input>'
  grid += '<label for="make">Enter Price:</label><input type="number" id="price" name="price"></input>'
  grid += '<label for="make">Enter Miles:</label><input type="number" id="miles" name="miles"></input>'
  grid += '<label for="make">Enter Color:</label><input type="text" id="color" name="color"></input>'
  grid += '<button type="submit">SUBMIT</button>'
  grid += '</form></section>'

  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util