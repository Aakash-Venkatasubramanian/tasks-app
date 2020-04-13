/*jshint esversion: 8 */

require('../db/mongoose')
const Task = require('../models/task')

const deleteAndShowCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteAndShowCount('5e91d6a7ebb5c23ed8f1f9d3', false).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})