const express = require('express');

const { validate, userValidator, signInValidator, ownerHouseValidator } = require('../middleware/Validator');
const { isAuth, isOwner } = require('../middleware/auth');
const { createHouse, updateOwnerHouse, removeOwnerHouse } = require('../Controllers/OwnerHouse');
const { uploadImage } = require('../middleware/multer');

const router = express.Router()

router.post("/create-house",
    isAuth,
    isOwner,
    uploadImage.single('picture'),
    ownerHouseValidator, validate, createHouse)

    router.patch("/update-house/:id", 
    isAuth,  isOwner, 
    
    uploadImage.single('picture'),
   
    ownerHouseValidator,
    validate,
        updateOwnerHouse)
    

        router.delete("/delete-house/:id", 
        isAuth, isOwner,  
        removeOwnerHouse
        )


       // router.get("/movies", isAuth, isOwner, getOwnerHouse);
module.exports = router;