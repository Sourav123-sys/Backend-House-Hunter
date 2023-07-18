const express = require('express');

const { validate,  } = require('../middleware/Validator');
const { isAuth, isOwner } = require('../middleware/auth');
const { createRentController, getRendById, removeRentHouse } = require('../Controllers/RentHouse.controller');



const router = express.Router()

router.post("/create-rent-house",
    isAuth,
    isOwner,
   
     validate, createRentController )
router.get("/get-rent/:id",
    isAuth,
    isOwner,
   
     validate, getRendById  )

  
     router.delete("/delete-rent/:id", 
        isAuth, isOwner,  
        removeRentHouse
        )
  


module.exports = router;