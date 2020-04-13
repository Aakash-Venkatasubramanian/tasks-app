const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser:true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description:'Game'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // db.collection('tasks').updateMany({
    //     completed:false
    // }, {
    //     $set:{
    //         completed:true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').insertOne({
    //     name:'Aakash',
    //     age:22
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description:'Works',
    //         completed:true
    //     }, {
    //         description:'Game',
    //         completed:false
    //     }, {
    //         description:'Series',
    //         completed:false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert data')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').findOne({_id:new ObjectID('5e8ec05ed8ed77335821f0ba')}, (error, data) => {
    //     if(error) {
    //         return console.log('Unable to fetch data')
    //     }

    //     console.log(data)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error, data) => {
    //     if(error) {
    //         return console.log('Unable to fetch data')
    //     }

    //     console.log(data)
    // })
})