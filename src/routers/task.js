const express = require('express')
const Task = require('../models/task')
const taskRouter = new express.Router()

// Create new task
taskRouter.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all tasks
taskRouter.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get one task with id
taskRouter.get('/tasks/:taskid', async (req, res) => {
    const id = req.params.taskid

    try {
        const task = await Task.findById(id)
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update task by id
taskRouter.patch('/tasks/:taskid', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({'error':'Invalid update'})
    }

    try {
        const task = await Task.findById(req.params.taskid)

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete task
taskRouter.delete('/tasks/:taskid', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskid)
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = taskRouter
