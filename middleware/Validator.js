const { check, validationResult } = require('express-validator');

const { isValidObjectId } = require('mongoose');

exports.userValidator = [
    check('name').trim().notEmpty().withMessage("name is invalid"),
  
    check('email').trim().normalizeEmail().notEmpty().isEmail().withMessage("email is invalid"),
    check('password').trim().notEmpty().withMessage("password is missing").isLength({ min: 4, max: 8 }).withMessage("password must be 4 to 8 characters"),
    check('phoneNumber')
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .isNumeric().withMessage("Phone number must be numeric")
    .isLength({ min: 9, max: 15 }).withMessage("Phone number must be between 10 and 15 digits")

]
exports.validate = (req, res, next) => { 
    const error = validationResult(req).array();
    ////console.log(error);
//if (!error.isEmpty()) {
//  //console.log(error.array());
 // return res.status(400).json({ errors: error.array() });
//}
    if (error.length) {
      return  res.json({ error:error[0].msg})
    }
    next()
}
exports.signInValidator= [
    
    check('email').trim().normalizeEmail().notEmpty().isEmail().withMessage("Email is invalid"),
    check('password').trim().notEmpty().withMessage("Password is missing")
]