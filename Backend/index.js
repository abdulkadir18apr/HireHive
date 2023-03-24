const express = require('express')
const connectToMongo=require("./db");
var cors = require('cors')
const env=require('dotenv').config({path: __dirname + '/.env'})
connectToMongo();

const app = express()
const port = 8000
app.use(cors())
//middleware
app.use(express.json())
//Available Routes
app.use('/api/auth',require('./routes/auth'))


app.get('/', (req, res) => {
  res.send('Hello HireHive!')
})

app.listen(port, () => {
  console.log(`HireHive Listneing on port ${port}`)
})