const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())

const { MongoClient } = require('mongodb');
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
    const news = database.collection('news')

    
    app.get('/news', as)

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