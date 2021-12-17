const express = require('express');
const cors = require('cors')//cors for own server connected with own
const app = express();
// const admin = require("firebase-admin");
require("dotenv").config();//dotenv config
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i6saz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("sodexo").collection("news");
//   // perform actions on the collection object
//   client.close();
// });

async function verifyToken(req, res, next) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const token = req.headers?.authorization.split(' ')[1];
    console.log(token);
    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      req.decodedEmail = decodedUser.email;
    }
    catch {
      
    }
  }
  next();
}

async function run() {
  try {
    await client.connect();
    console.log('connected');
    const database = client.db("sodexo-socat");
    const newsCollection = database.collection("news")
    const inspiredCollection = database.collection("inspired")
    const foodServicesCollection = database.collection("food-services")

    
    app.get("/news", async (req, res) => {
      const cursor = newsCollection.find({});
      const news = await cursor.toArray();
      res.send(news)
      console.log('news server connected');
    });

    app.get("/inspired", async (req, res) => {
      const cursor = inspiredCollection.find({});
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
       
      } 
       const inspired = await cursor.toArray();
      res.send(inspired)
      console.log('inspired server connected');
    });

    app.get('/food-services', async (req, res) => {
      const cursor = foodServicesCollection.find({});
      const foodServices = cursor.toArray();
      res.send(foodServices);
 console.log('inspired server connected');
    })
    

    app.post('/news', async (req, res)=>{
  console.log("data connected from add news")
})








  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})