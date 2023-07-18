const { isValidObjectId } = require('mongoose')
const User= require('../models/User')
const jwt = require('jsonwebtoken');
const { generateRandomByte } = require('../utils/helper');

exports.create = async (req, res) => {
    const { name, email, password,role,phoneNumber } = req.body
    console.log(name, email, password, 'from create')
    const oldUser = await User.findOne({ email })

    if (oldUser) {
        return res.status(401).send({ error: 'Email already exists' })
    }
    const newUser = new User({ name, email, password,role,phoneNumber })
    await newUser.save()



    res.status(201).json({
        User: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
           role: newUser.role,
           phoneNumber: newUser.phoneNumber,

        }


    }
    )
    //console.log(

    //     newUser._id,
    //     newUser.name,
    //     newUser.email,
    //     'created',

    // )
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password, 'signin')
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(200).json({ error: "User doesn't exist." })
        }
        const matched = await user.comparePassWord(password)
        //console.log(matched, 'signin')
        if (matched) {
            //console.log(matched, 'enter into match try')
            const { _id, name,role, } = user

            const jwtToken = jwt.sign({ userId: user._id }, 'duhehfjswhhufegfuhshfusjhdhfrwuwhfoe')

            res.json({ user: { id: _id, name, email,role, token: jwtToken, role } })
        } else {
            return res.status(200).json({ error: "you entered wrong password." })
        }


    } catch (error) {
        //console.log(error)
        next(error.message)
    }
}
