const { isValidObjectId } = require('mongoose')
const OwnerHouse= require('../models/OwnerHouse')

const { generateRandomByte } = require('../utils/helper');


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


