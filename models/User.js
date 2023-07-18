const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true,
        default: 'renter',
        enum: ['renter', 'owner']
    }
})
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

UserSchema.methods.comparePassWord = async function (password) {
    //console.log(password, 'pass from User model')
    const result = await bcrypt.compare(password, this.password)
    //console.log(result, 'result from User model')
    return result
}
module.exports = mongoose.model("User", UserSchema)