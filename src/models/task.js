<<<<<<< HEAD
/*jshint esversion: 8 */

const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = mongoose.Schema({
    description: {
=======
const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description:{
>>>>>>> rewamp
        type:String,
        required:true,
        trim:true
    },
<<<<<<< HEAD
    completed: {
        type:Boolean,
        default:false
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Tasks = mongoose.model('Task', taskSchema)

module.exports = Tasks
=======
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = Task
>>>>>>> rewamp
