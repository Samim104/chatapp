const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const connect = require('./config/Db');
const cors = require('cors')


app.use(express.json())
app.use(cors())


connect();

app.use('/api/v1', require('./routes/index'))

app.listen(port, () => console.log('> Server is up and running on port : ' + port))

app.get('/',(req,res)=>{
    res.send('welcome to chat app backend')
})