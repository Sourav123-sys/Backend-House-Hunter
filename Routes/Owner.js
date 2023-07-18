const express = require('express');

const { validate, userValidator, signInValidator, ownerHouseValidator } = require('../middleware/Validator');
const { isAuth, isOwner } = require('../middleware/auth');
const { createHouse, updateOwnerHouse } = require('../Controllers/OwnerHouse');
const { uploadImage } = require('../middleware/multer');

const router = express.Router()

router.post("/create-house",
    isAuth,
    isOwner,
    uploadImage.single('picture'),
    ownerHouseValidator, validate, createHouse)

    router.patch("/house-update/:id", 
    isAuth,  isOwner, 
    
    uploadImage.single('picture'),
   
    ownerHouseValidator,
    validate,
    updateOwnerHouse)
module.exports = router;