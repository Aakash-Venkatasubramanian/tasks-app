/*jshint esversion: 8 */

const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/user/register', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.getAuthToken()
        res.send({result:user, token, status:'success'})
    } catch(error) {
        res.status(400).send({result:error, status:'failed'})
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.getAuthToken()
        res.send({result:user, token, status:'success'})
    } catch (error) {
        res.status(400).send({result:error, status:'failed'})
    }
})

router.get('/user/profile', auth, async (req, res) => {
    res.send({result:req.user, status:'success'})
})

router.get('/user/:_id', async (req, res) => {
    const _id = req.params._id
    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send({result:{'error':'No user found'}, status:'success'})
        }
        res.send({result:user, status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

router.patch('/user/:_id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({'error':'Invalid update'})
    }

    try {
        const user = await User.findById(req.params._id)
        
        if(!user) {
            return res.status(404).send({result:{'error':'No user found'}, status:'success'})
        }

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send({result:user, status:'success'})
    } catch (error) {
        res.status(400).send({result:error, status:'failed'})
    }
})

router.get('/users/:name', async (req, res) => {
    const name = req.params.name
    const users = await User.find({'name':name})
    try {
        if(users.length === 0) {
            return res.status(404).send({result:{'error':'No user found'}, status:'success'})
        }
        res.send({result:users, status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

router.delete('/user/:_id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params._id)
    try {
        if(!user) {
            return res.status(404).send({result:{'error':'No user found'}, status:'success'})
        }
        res.send({result:user, status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

module.exports = router