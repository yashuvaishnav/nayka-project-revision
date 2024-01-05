const express=require("express");
require("dotenv").config();
const app=express();
const cors=require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.routes");
const { productRouter } = require("./routes/product.routes");

//internal middlewares..................
app.use(cors());
app.use(express.json());
app.use("/",userRouter);
app.use("/",productRouter);

app.get("/",(req,res)=>{
    res.send("server is working");
})

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("server is running at port 8080");
    }
    catch(err){
        console.log("server error");
    }
})
