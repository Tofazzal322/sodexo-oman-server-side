const express = require('express')
var cors = require('cors')
const app = express()
require("dotenv").config();//dotenv config
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

const { MongoClient, ListCollectionsCursor } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i6saz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("sodexo").collection("news");
//   // perform actions on the collection object
//   client.close();
// });

async function run() {
  try {
    await client.connect();
    const database = client.db("sodexo");
    const newsCollection = database.collection('news')

    
    app.get('/news', async (req, res) => {
      const cursor = newsCollection.find({});
      const news = await ListCollectionsCursor.
      console.log('object');
    })

    app.post('/news', async (req, res)=>{
  console.log("data connected from add news")
})








  }
  finally {
    // await client.close();
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})