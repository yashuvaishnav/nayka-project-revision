const mongoose=require("mongoose");
mongoose.set('strictQuery', true);

const userSchema=mongoose.Schema({
    name:String,
    avatar : String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    created_at : String,
    updated_at : String
},{
    versionKey:false
})

const UserModel=mongoose.model("registeredUsers",userSchema);
module.exports= { UserModel };
