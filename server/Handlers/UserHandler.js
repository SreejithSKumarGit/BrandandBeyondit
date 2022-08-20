const Users =require("../Database/Users");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs')

async function register(req,res,next)
{
    try {
        const user=await Users.findOne({email:req.body.email});
        if(user)
        {
            return res.status(400).json({status:"error",message:"Email Id already exists"})
        }
        const newPassword=await bcrypt.hash(req.body.password,10)
        await Users.create({
            name:req.body.name,
            email:req.body.email,
            password:newPassword,
            type:req.body.type,
            account_creation:new Date(),
            last_loggin:new Date(),
            no_of_loggins:0
        })
        return res.status(200).json({status:"ok",message:"Account created successfully"})
    } catch (error) {
        res.status(400).json({status:"error",message:error})
    }
}
async function login(req,res,next)
{
    try {
        const user=await Users.findOne({email:req.body.email})
    
        if(!user)
        {
            return res.status(400).json({status:"error", message:"Invalid Login"})
        }
        
        const isPasswordValid=await bcrypt.compare(req.body.password,user.password);
        
        if(isPasswordValid)
        {
            user.last_loggin=new Date();
            user.no_of_loggins++;
            user.save()
            const token=jwt.sign({
                name:user.name,
                email:user.email
            },"secret123");
            return res.status(200).json({status:"ok",user:token})
        }
        else
        {
            return res.status(400).json({status:"error",message:"Enter valid password"})
        }
            
    } catch (error) {
        return res.status(400).json({status:"error",message:error})
    }
}
async function getUsersDetails(req,res,next)
{
    const token =req.headers["x-access-token"]

    try {
            const decoded=jwt.verify(token,"secret123");
            const email=decoded.email;
            const user=await Users.find({email:email});
            if(user[0].type=="admin")
            {
                const users=await Users.find()
                return res.status(200).json({status:"ok",users:users})
            }
            else
            {
                return res.status(200).json({status:"ok",users:user})
            }
        } 

    catch (error) {
        res.json({status:"error",error:"Invalid Token"});
    }
}

module.exports={register,login,getUsersDetails};