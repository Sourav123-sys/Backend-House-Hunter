const { isValidObjectId } = require('mongoose')
const OwnerHouse= require('../models/OwnerHouse')




const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});
exports.createHouse = async (req, res) => {
    const { file, body } = req

    const {
        name,address,city,bedrooms,bathrooms,roomSize,availabilityDate,rentPerMonth,phoneNumber,description
    } = body
console.log(body,"body from create Owner");
    const newOwnerHouse = new OwnerHouse({
        name,address,city,bedrooms,bathrooms,roomSize,availabilityDate,rentPerMonth,phoneNumber,description
    })

    if (file) {

        const HouseRes = await cloudinary.uploader.upload(file.path, {
            transformation: {
                width: 1280,
                height: 720,
            },
            responsive_breakpoints: {
                create_derived: true,
                max_width: 640,
                max_images: 3,
            },
        });
    
    
        const { secure_url: url, public_id, responsive_breakpoints } = HouseRes
    
        const HouseImage= { url, public_id, responsive: [] }
    
        const { breakPoints } = responsive_breakpoints[0]
        if (breakPoints?.length) {
            for (let imgObj of breakPoints) {
                const { secure_url } = imgObj
                HouseImage.responsive.push(secure_url)
            }
        }
        newOwnerHouse.picture= HouseImage
    
        //console.log(posterRes, 'posterRes ')
        //console.log(posterRes.responsive_breakpoints[0].breakpoints);
    }

    

    await newOwnerHouse.save()

    res.status(201).json({
        id: newOwnerHouse._id,
        name,address,city,bedrooms,bathrooms,roomSize,availabilityDate,rentPerMonth,phoneNumber,description,picture:newOwnerHouse.picture
    })
}


exports.updateOwnerHouse= async (req, res) => {
    const { id } = req.params;
    const { file } = req;
  const HouseId = id
    if (!isValidObjectId(HouseId)) {
        return res.status(200).json({ error: "Invalid House ID!" })
    } 
  
    
  
    const ownerHouse= await OwnerHouse.findById(HouseId);
    //console.log(ownerHouse,"update-movie");
    if (!ownerHouse) {
        return res.status(200).json({ error: "ownerHouse Not Found!" })
    } 
  
    const {
        name,address,city,bedrooms,bathrooms,roomSize,availabilityDate,rentPerMonth,phoneNumber,description,
    picture} = req.body;
  
   ownerHouse.name = name;
   ownerHouse.address = address;
   ownerHouse.city = city;
   ownerHouse.bedrooms = bedrooms;
   ownerHouse.bathrooms = bathrooms;
   ownerHouse.roomSize = roomSize;
   ownerHouse.availabilityDate = availabilityDate;
   ownerHouse.rentPerMonth = rentPerMonth;
   ownerHouse.phoneNumber = phoneNumber;
   ownerHouse.description = description;
  
  
    // update picture
    if (file) {
      // removing poster from cloud if there is any.
        const pictureID =ownerHouse.picture?.public_id;
        //console.log(pictureID,"pictureID id for ownerHouse update");
        if (pictureID) {
          console.log(pictureID,"enter");
          const   result  = await cloudinary.uploader.destroy(pictureID);
          //console.log(result,"result from update-movie");
        if (result.result === "not found") {
            return res.status(200).json({ error: "Could not update picture at the moment!" });
        }
  
        // uploading picture
        const {
          secure_url: url,
          public_id,
          responsive_breakpoints,
        } = await cloudinary.uploader.upload(req.file.path, {
          transformation: {
            width: 1280,
            height: 720,
          },
          responsive_breakpoints: {
            create_derived: true,
            max_width: 640,
            max_images: 3,
          },
        });
  
        const finalPicture = { url, public_id, responsive: [] };
  
        const { breakpoints } = responsive_breakpoints[0];
        if (breakpoints.length) {
          for (let imgObj of breakpoints) {
            const { secure_url } = imgObj;
            finalPicture .responsive.push(secure_url);
          }
        }
  
       ownerHouse.picture = finalPicture ;
      }
    }
  
    await ownerHouse.save();
  
    res.json({ message: "ownerHouse is updated",ownerHouse: {
        id:ownerHouse._id,
       name: ownerHouse.name,
      address:  ownerHouse.address,
      city:  ownerHouse.city,
         bedrooms : ownerHouse.bedrooms ,
        bathrooms : ownerHouse.bathrooms, 
       roomSize : ownerHouse.roomSize , 
       availabilityDate :  ownerHouse.availabilityDate, 
        rentPerMonth : ownerHouse.rentPerMonth ,
        phoneNumber : ownerHouse.phoneNumber ,
         description : ownerHouse.description ,
        picture:ownerHouse.picture?.url,
        
      }, });
  };

  exports.removeOwnerHouse = async (req, res) => {
    const { id } = req.params
    const ownerHouseId = id
    const {picture} =req.body
    console.log(picture,"poster from remove movie");
    if (!isValidObjectId(ownerHouseId)) {
        return res.status(200).json({ error: "Invalid ownerHouse id" })
    }
   
    const ownerHouse = await OwnerHouse.findById(ownerHouseId)
    if (!ownerHouse ) {
        return res.status(200).json({ error: "ownerHouse  not found" })
    }
console.log(ownerHouse ,"ownerHouse -remove");
    const public_id = ownerHouse ?.picture?.public_id
    //console.log(public_id, "pictureid");
    
    
    if (public_id) { 
     
        const   result  =await cloudinary.uploader.destroy(public_id)
       // console.log(result.result, 'result from remove with picture')

        if (result.result ==='not found') {
            return res.status(200).json({ error: "could not remove picture from cloud" })
        }

    }

   
    

    await OwnerHouse.findByIdAndDelete(ownerHouseId)
    res.json({message: 'Owner House deleted successfully'})


}