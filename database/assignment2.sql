-- INSERT Tony Stark Information to Account Table
INSERT INTO account
	(account_firstname, account_lastname, account_email, account_password)
VALUES
	('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n')

-- Update Tony Stark account type to Admin
UPDATE
	account
SET
	account_type = 'Admin'
WHERE
	account_firstname = 'Tony'

-- Delete Tony Stark record
DELETE
FROM
	account
WHERE
	account_firstname = 'Tony'

-- Update GM Hummer description
UPDATE
	inventory
SET
	inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE
	inv_model = 'Hummer'

-- Use Inner Join to select make, model, and classification names for "Sport" cars
SELECT
	inv_make,
	inv_model,
	classification_name
FROM
	inventory
INNER JOIN classification
	ON inventory.classification_id = classification.classification_id
WHERE
	inventory.classification_id = 2

-- Replace '/images/' with '/images/vehicles/' in the inv_image and inv_thumbnail columns
UPDATE
    inventory
SET
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, 'images', 'images/vehicles/')