const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1'
const dbName = 'store'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('items')
  return collection.insertOne(item)
}

const getItems = () => {
  const collection = db.collection('items')
  return collection.find({}).toArray()
}

const getItemsbyId = (id) => {
  const collection = db.collection('items')
  return collection.find({ _id: ObjectId(id) }).toArray()
}

const updateQuantity = (id, quantity, name) => {
  const collection = db.collection('items')
  return collection.updateOne({ _id: ObjectId(id) }, { $set: { quantity, name } })
}

const deleteItem = (id) => {
  const collection = db.collection('items')
  return collection.deleteOne({ _id: ObjectId(id) })
}


module.exports = { init, insertItem, getItems, getItemsbyId, updateQuantity, deleteItem }
