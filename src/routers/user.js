const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const userRouter = new express.Router()

// Create new user
userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// Login user
userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

// Get all users
userRouter.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Get one user with id
userRouter.get('/users/:userid', async (req, res) => {
    const id = req.params.userid

    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update user by id
userRouter.patch('/users/:userid', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({'error':'Invalid update'})
    }

    try {
        const user = await User.findById(req.params.userid)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete user
userRouter.delete('/users/:userid', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userid)
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = userRouter
