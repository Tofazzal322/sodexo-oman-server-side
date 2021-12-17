const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://}:<password>@cluster0.i6saz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})