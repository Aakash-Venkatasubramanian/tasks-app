<<<<<<< HEAD
/*jshint esversion: 8 */

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
=======
const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name:{
>>>>>>> rewamp
        type:String,
        required:true,
        trim:true
    },
<<<<<<< HEAD
    age: {
        type:Number,
        default:0
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
=======
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
>>>>>>> rewamp
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
<<<<<<< HEAD
    password: {
=======
    password:{
>>>>>>> rewamp
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
<<<<<<< HEAD
                throw new Error('Password cannot contain password')
            }
        }
    },
    tokens: [{
        token: {
            type:String,
            required:true
        }
    }]
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens
    delete userObject.password
    delete userObject.__v

    return userObject
}

userSchema.methods.getAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id:user._id}, 'newapp')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({email})

    if(!user) {
        throw new Error('Unable to Login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to Login')
    }

    return user
}

// Hashing passwords
userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const Users = mongoose.model('User', userSchema)

module.exports = Users
=======
                throw new Error('Invalid password')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be positive')
            }
        }
    }
})

module.exports = User
>>>>>>> rewamp
