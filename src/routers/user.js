<<<<<<< HEAD
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

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        
        res.send({result:'Logout successful', status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({result:'Logout successful', status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

router.get('/user/profile', auth, async (req, res) => {
    res.send({result:req.user, status:'success'})
})

router.patch('/user/profile', auth, async (req, res) => {
=======
const express = require('express')
const User = require('../models/user')
const userRouter = new express.Router()

// Create new user
userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all users
userRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
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
>>>>>>> rewamp
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({'error':'Invalid update'})
    }

    try {
<<<<<<< HEAD
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send({result:req.user, status:'success'})
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

router.delete('/user/profile', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send({result:req.user, status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

module.exports = router
=======
        const user = await User.findByIdAndUpdate(req.params.userid, req.body, {new:true, runValidators:true})
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
>>>>>>> rewamp
