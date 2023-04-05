const express = require('express')
const connectToMongo = require("./db");
var cors = require('cors')
const env = require('dotenv').config({ path: __dirname + '/.env' })
const path = require('path');
connectToMongo();

const app = express()
const port = 8000
app.use(cors())
//middleware
app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/student/profile', require('./routes/student/profile'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello HireHive!' + __dirname);
})

app.listen(port, () => {
  console.log(`HireHive Listneing on port ${port}`)
})