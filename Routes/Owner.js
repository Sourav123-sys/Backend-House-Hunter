const express = require('express');

const { validate, userValidator, signInValidator, ownerHouseValidator } = require('../middleware/Validator');
const { isAuth, isOwner } = require('../middleware/auth');
const { createHouse } = require('../Controllers/OwnerHouse');
const { uploadImage } = require('../middleware/multer');

const router = express.Router()

router.post("/create-house",
    isAuth,
    isOwner,
    uploadImage.single('picture'),
    ownerHouseValidator, validate, createHouse)


module.exports = router;