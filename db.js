const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
//connect to db

console.log(process.env.db_user)
console.log(process.env.db_pass)
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.eowzq.mongodb.net/HomeHunter?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

mongoose.connect(
    uri, { useNewUrlParser: true, useUnifiedTopology: true }
).
    then(() => {
    console.log(uri);
    console.log("mongoose is connected");
}).catch((err) => {
    console.log("db connection failed :",err);
})