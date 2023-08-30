const connectToMongo = require('./db');
const express = require('express')

connectToMongo(); // connect to database

const app = express()
const port = 5000

app.use(express.json());
//Available Routes
app.use('/api/sheet',require('./route/spreadsheet'));

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log(res);
})

app.listen(port, () => {
  console.log(`Example app listening on porth http://localhost:${port}`)
})
