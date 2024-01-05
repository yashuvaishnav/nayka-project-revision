const mongoose=require("mongoose");
mongoose.set('strictQuery', true);

const productSchema=mongoose.Schema({
    picture:{
        type:String,
        require:true
    },
    name:{
        type:String,
        reuired:true
    },
    description:{
        type:String,
        reuired:true
    },
    gender:{
        type:String,
        reuired:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    },
    created_at:{
        type:String,
        require:true
    },
    updated_at:{
        type:String,
        require :true
    }
},{
    versionKey:false
})

const ProductModel=mongoose.model("product",productSchema);

module.exports= { ProductModel };