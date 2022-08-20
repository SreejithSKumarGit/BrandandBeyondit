const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    account_creation:{
        type:Date,
        required:true,
        default:new Date()
    },
    last_loggin:{
        type:Date,
        required:true,
        default:new Date()
    },
    no_of_loggins:{
        type:Number,
        required:true,
        default:0
    }
})

const Users=mongoose.model("User",userSchema);

module.exports=Users;