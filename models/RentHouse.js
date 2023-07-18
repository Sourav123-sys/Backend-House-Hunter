const mongoose = require('mongoose');

const { ObjectId } = require('mongoose')
const RentHouseSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
  
    email: {
        type: String,
        trim: true,
        required: true
    },
  
    phoneNumber: {
        type: Number,
        trim: true,
        required: true
    },
  
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

},
{
    timestamps: true,
  }
)

    module.exports = mongoose.model("RentHouse",RentHouseSchema)
  
   
  
   
 
  



