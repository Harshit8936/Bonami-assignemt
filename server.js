require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const connectDb = require('./db/db');

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello world !")
})

app.use('/api',require('./routes/route'));


connectDb().then(app.listen(port,()=>{
    console.log(`App is running on ${port}`);
}))

