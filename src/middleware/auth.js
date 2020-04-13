/*jshint esversion: 8 */

const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        const decode = jwt.verify(token, 'newapp')
        const user = await User.findOne({_id:decode._id, 'tokens.token':token})

        if(!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error:'Please authenticate', status:'failed'})
    }
}

module.exports = auth