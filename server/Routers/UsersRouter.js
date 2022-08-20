const express=require("express");
const { register, login, getUsersDetails } = require("../Handlers/UserHandler");


const UsersRouter=express.Router();

UsersRouter.post("/register",register);
UsersRouter.post("/login",login);
UsersRouter.get("/getUsers",getUsersDetails);


module.exports=UsersRouter;