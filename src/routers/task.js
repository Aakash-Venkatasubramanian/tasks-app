<<<<<<< HEAD
/*jshint esversion: 9 */

const express = require('express')
const Task = require('../models/task')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        if(tasks.length === 0) {
            return res.status(404).send({result:{'error':'No tasks found'}, status:'success'})
        }
        res.send({result:tasks, status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

router.get('/task/:_id', async (req, res) => {
    const _id = req.params._id
    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send({result:{'error':'No tasks found'}, status:'success'})
        }
        res.send({result:task, status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

router.patch('/task/:_id', async (req, res) => {
=======
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
>>>>>>> rewamp
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({'error':'Invalid update'})
    }

    try {
<<<<<<< HEAD
        const task = await Task.findById(req.params._id)
        
        if(!task) {
            return res.status(404).send({result:{'error':'No tasks found'}, status:'success'})
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send({result:task, status:'success'})
    } catch (error) {
        res.status(400).send({result:error, status:'failed'})
    }
})

router.delete('/task/:_id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params._id)
    try {
        if(!task) {
            return res.status(404).send({result:{'error':'No task found'}, status:'success'})
        }
        res.send({result:task, status:'success'})
    } catch (error) {
        res.status(500).send({result:error, status:'failed'})
    }
})

module.exports = router
=======
        const task = await Task.findByIdAndUpdate(req.params.taskid, req.body, {new:true, runValidators:true})
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
>>>>>>> rewamp
