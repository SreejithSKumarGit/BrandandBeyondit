require('dotenv').config({path:"./.env"});
const express=require("express");
const path=require("path");
const cors=require("cors");
const session = require('express-session');
const connectDatabase=require("./Database/index");
const UsersRouter=require("./Routers/UsersRouter");
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname+"/public")))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use((req,res,next) =>{
    console.log('request receive')
    console.log(req.body)
    next()
}) 
app.use(UsersRouter);
const  PORT=process.env.PORT || 8080;

connectDatabase()
.then(()=>
{
    app.listen(PORT,()=>
    {
        console.log("Server connected successfully to", PORT)
    })
})