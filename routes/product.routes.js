
const express=require("express");
const { ProductModel } = require("../model/product.model");
const productRouter = express.Router();


productRouter.get("/product",async(req,res)=>{
    try {
        const productData = await ProductModel.find();
        res.status(200).send(productData);
    } catch (error) {
        
    }
})
productRouter.post("/product",async(req,res)=>{
    try {
        const products = new ProductModel(req.body);
        await products.save();
        res.status(200).send({"message": "product added successfully"});
    } catch (error) {
        
    }
})
productRouter.get("/products/:id",async(req,res)=>{
    const id=req.params.id;
try{
    const findTheProduct=await ProductModel.findOne({_id:id});
    res.status(200).send(findTheProduct);
}
catch(err){
res.status(400).send({"message":err.message});
}
})

productRouter.put("/products/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const result = await ProductModel.findByIdAndUpdate(
        id,
        updatedData,
        options
      );
      res.send(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
});

productRouter.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;
    try {
      await ProductModel.findByIdAndDelete({ _id: productId });
      res.send({ msg: "Product deleted successfully" });
    } catch (err) {
      res.send(400).send({ msg: "Something Went Wrong" });
    }
});


module.exports = { productRouter }