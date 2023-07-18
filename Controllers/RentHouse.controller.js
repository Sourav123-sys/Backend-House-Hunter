

const OwnerHouse = require('../models/OwnerHouse')
const RentHouse= require('../models/RentHouse')
const User = require('../models/User')
const { isValidObjectId } = require('mongoose')

exports.createRentController = async (req, res) => {
    const rentdata = req.body
    const { name, email, phoneNumber, houseId,userId } = rentdata

    const newRentHouse = new RentHouse({
        name, email, phoneNumber, houseId,userId
    })
    try {

        if (!name) {
            throw new Error("name is required")
        }
        if (!email) {
            throw new Error("email is required")
        }
        if (!phoneNumber) {
            throw new Error("phone number is required")
        }
        if (!houseId) {
            throw new Error("house id  is missing")
        }
        const isExistRent = await RentHouse.findOne({houseId})
        console.log(isExistRent,"isexist");
        if (isExistRent) {
            throw new Error("House is already rented")
        }
      


        const rentHouse = await newRentHouse.save()
       
        const populatedRentHouse = await RentHouse.findById(rentHouse._id).populate([{ path: "houseId", model: OwnerHouse },
        {path:"userId",model:User}
        ]);
    if (!rentHouse) {
        throw new Error ("There is no rent house in your list")
    }
        
        
    res.status(200).json({message : "House rented successfully", data : populatedRentHouse})
    }
    catch (err) {
        console.log(err);
        throw  err 
    }
}


exports.getRendById = async (req,res) => {
    const { id } = req.params
    try {
        
        const populatedRentHouse = await RentHouse.find({userId:id}).populate([{ path: "houseId", model: OwnerHouse },
        {path:"userId",model:User}
        ]);
        console.log(populatedRentHouse);
        if (!populatedRentHouse.length ) {
            throw new Error("There is no rent house ")
                }
        res.status(200).json({message : "Here is your rent house", data : populatedRentHouse})
    } catch (err) {
        console.log(err);
        throw err
    }
}
exports.removeRentHouse = async (req, res) => {
    const { id } = req.params
    const rentHouseId = id
   
   
    if (!isValidObjectId(rentHouseId)) {
        return res.status(200).json({ error: "Invalid rentHouseId id" })
    }
   
    const rentHouse = await RentHouse.findById(rentHouseId)
    if (!rentHouse ) {
        return res.status(200).json({ error: "rentHouse  not found" })
    }

    
    
   
    await RentHouse.findByIdAndDelete(rentHouseId)
    res.json({message: 'Rent House deleted successfully'})


}

