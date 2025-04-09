const express=require('express');
const { dbconnection } = require('./config/dbconnect');
const { router } = require('./route/route');
const { user } = require('./models/userModel');
const { userValidator } = require('./middleware/userValidate');
require('dotenv').config();
const app=express()


app.use(express.json())


app.use('/api',router)
user.sync({force:false})

app.listen(8000,async(req,res)=>{
    console.log(`Server is listen on port ${process.env.PORT}`);
    await dbconnection()
    
})



