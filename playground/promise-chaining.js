require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5eccacc2192b96035f79cb8a').then((data) => {
//     console.log(data)
//     return Task.countDocuments({completed:false})
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id, completed) => {
    const data = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return {data, count}
}

deleteTaskAndCount('5eccacf33f3c750363e3fc4f', false).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})