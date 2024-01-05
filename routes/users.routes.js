const express=require("express");
const bcrypt=require('bcrypt');
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt=require("jsonwebtoken");


userRouter.post("/register",async(req,res)=>{
try{
    let obj=req.body;
    if (!obj.name) {
        return res.status(200).send({ "message": "Username is required" });
      }
      if (!obj.email) {
        return res.status(200).send({ "message": "Email is required" });
      }
      if (!obj.password) {
        return res.status(200).send({ "message": "Password is required" });
      }

  
const findThiUserAlreadyExist=await UserModel.findOne({email:req.body.email});
if(findThiUserAlreadyExist){
    return res.status(200).send({"message":"This Email Is Already Registerd"});
}
else{
    bcrypt.hash(obj.password,2,async(req,hashed)=>{
        if(hashed){
            let newUser=new UserModel({...obj,password:hashed});
            await newUser.save();
            res.status(200).send({"message":"Registered Successfully","user":newUser});
        }
        else{
            res.status(400).send({"message":"Sorry for inconvinence as password is not hashed"});
        }
    })
}

}
catch(err){
res.status(400).send({"message":"Error Regisetring User"});
}
})

//login...........
userRouter.post("/login",async(req,res)=>{
try{
    const Admin = await UserModel.findOne({email:req.body.email})
    if(req.body.email === "admin@admin.com" && bcrypt.compare(req.body.password, Admin.password)){
        const token=jwt.sign({userName:req.body.userName,userId:req.body._id},"secretkey");
        return res.status(200).send({message :"Logged Successfully",token:token, Admin : true, user: Admin});
    }
    
const findIfTHisEmailIsNotReg=await UserModel.findOne({email:req.body.email});
if(!findIfTHisEmailIsNotReg){
    return res.status(200).send({"message":"This EmailId is not registered"});
}
else{
    bcrypt.compare(req.body.password,findIfTHisEmailIsNotReg.password,(err,result)=>{
        if(result){
            const token=jwt.sign({userName:req.body.userName,userId:req.body._id},"secretkey");
            res.status(200).send({"message":"Logged Successfully",token:token,user:findIfTHisEmailIsNotReg});
        }
        else{
            res.status(200).send({"message":"Incorrect Password"});
        }
    })
}
}
catch(err){
res.status(400).send({"message":"Error LoggingIn"});
}
})

//logout
userRouter.post("/logout",async(req,res)=>{
    // console.log(req.body.logoutToken)
    try {
        const LogoutUserModel = new BlacklistUserModel({logoutToken:token});
        await LogoutUserModel.save();
        res.status(200).send({"message":"Logged out Successfully"})
    } 
    catch (error) {
        res.status(400).send({message:error})
    }
})


module.exports={userRouter};