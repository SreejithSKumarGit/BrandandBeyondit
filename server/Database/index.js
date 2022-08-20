require('dotenv').config({path:"../.env"});
const mongoose=require("mongoose");



async function connectDatabase()
{
    const dbURI=process.env.mongodb_URI;
    try {
        
        await mongoose.connect(dbURI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Something went wrong");
    }
}


module.exports=connectDatabase;