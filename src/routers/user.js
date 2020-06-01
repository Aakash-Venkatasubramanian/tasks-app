const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const {signUpEmail, deleteAccountEmail} = require('../email/accounts')
const User = require('../models/user')
const userRouter = new express.Router()

// Create new user
userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        signUpEmail(user.name, user.email)
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

// Logout user
userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Logout from all devices
userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Get user profile
userRouter.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Update user by id
userRouter.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({'error':'Invalid update'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete user
userRouter.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        deleteAccountEmail(req.user.name, req.user.email)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

// Upload a display picture
userRouter.post('/users/me/dp', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.dp = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error:error.message})
})

// Delete user dp
userRouter.delete('/users/me/dp', auth, async (req, res) => {
    try {
        req.user.dp = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Display profile picture
userRouter.get('/users/:userid/dp', async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)

        if(!user || !user.dp) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.dp)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = userRouter
