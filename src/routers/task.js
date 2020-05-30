const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const taskRouter = new express.Router()

// Create new task
taskRouter.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all tasks
taskRouter.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get one task with id
taskRouter.get('/tasks/:taskid', auth, async (req, res) => {
    const _id = req.params.taskid

    try {
        const task = await Task.findOne({_id, owner:req.user._id})
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update task by id
taskRouter.patch('/tasks/:taskid', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({'error':'Invalid update'})
    }

    try {
        const task = await Task.findOne({_id:req.params.taskid, owner:req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete task
taskRouter.delete('/tasks/:taskid', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.taskid, owner:req.user._id})
        
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = taskRouter
