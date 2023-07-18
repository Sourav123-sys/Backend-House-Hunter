const express = require('express');
const { create, signIn } = require('../Controllers/User');
const { validate, userValidator, signInValidator } = require('../middleware/Validator');

const router = express.Router()

router.post("/create", userValidator, validate, create)

router.post("/signin",signInValidator,validate,signIn)
module.exports = router;