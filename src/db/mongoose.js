<<<<<<< HEAD
/*jshint esversion: 8 */

const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/tasks-api'

mongoose.connect(connectionURL, {
    useNewUrlParser:true, 
    useCreateIndex:true, 
    useUnifiedTopology:true,
    useFindAndModify:true
=======
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
>>>>>>> rewamp
})