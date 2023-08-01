const express = require('express')
const app= express()
const Connection= require("./Database/Db.js")
const cors = require('cors'); 
const UserData=require('../Backend/Controller/Usersdata.js')
const router = require('../Backend/Controller/Usersdata.js')


app.use(cors());
app.use(express.json());

app.use('/',UserData)


const port =5000;
Connection()
app.listen(port,()=>console.log(`http://localhost:${port}`))

