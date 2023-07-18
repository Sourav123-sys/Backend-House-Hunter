const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const OwnerHouseSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true,
     
    },
   city : {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true,
      
    },
    bathrooms: {
        type: Number,
        required: true,
      
    },
    roomSize: {
        type: Number,
        required: true,
      
    },
    availabilityDate: {
        type: Date,
        required: true,
      
    },
    rentPerMonth: {
        type: Number,
        required: true,
      
    },
    phoneNumber: {
        type: Number,
        required: true,
       
    },
    description: {
        type: String,
        trim: true,
        required: true,

    },
   picture: {
    type: Object,
    url: {type:String, required:true},
    public_id: { type: String, required: true },
    responsive: [  URL],
    required:true
    }
  
})



module.exports = mongoose.model("OwnerHouse", OwnerHouseSchema)