const model = require('../models/products');
const mongoose = require('mongoose');
const Product = model.Product;
exports.getProducts = async (req,res)=>{
    try {
        // destructure page and limit and set default values
        const { page = 1, limit = 4 } = req.params;

        const products = await Product.find().limit(limit).skip((page-1)*limit);
        // get total documents in the Posts collection 
        const prdCount = await Product.count();
        if(products.length>0){
        res.json({status:1,totalPages: Math.ceil(prdCount / limit),
        currentPage: page,products});
       }else {
        res.json({status:0,message:'Record does not found!'}); 
      }
    } catch (error) {
        res.status(400).json({staus:0,message:'Something went wrong!',error});
    }
    
}
exports.getProduct = async (req,res)=>{

    try{
    const id = req.params.id
    const product = await Product.findById(id);
    if(product._id!=''){
    res.json({status:1,product});
    }else{
        res.json({status:0,message:'Record does not found'});
    }
}catch (error) {
    res.status(500).json({staus:0,message:'Something went wrong!',error});
}
}
exports.delProduct = async (req,res)=>{
  try{
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id);
    res.json({status:1,product});
    }catch (error) {
        res.status(500).json({staus:0,message:'Something went wrong!',error});
    }
}
exports.replaceProduct = async (req,res)=>{
    try{
    const id = req.params.id
    const product = await Product.findOneAndReplace({_id:id},{...req.body},{new:true});
    res.json({status:1,product});
    }catch(err){
        res.status(500).json({status:0,message:'some exception are getting',err});
    }
}
exports.updateProduct = async (req,res)=>{
    try{
    const id = req.params.id
    const product = await Product.findByIdAndUpdate(id,{...req.body},{new:true});
    res.json({status:1,product});
    }catch (error) {
        res.status(500).json({staus:0,message:'Something went wrong!',error});
    }
}
exports.postProduct = async (req,res)=>{
    try {
        const product = new Product(req.body);
        const doc = await product.save();
          res.json({status:1,product:doc})
    } catch (error) {
        res.status(500).json({staus:0,message:'Something went wrong!',error});
    }
    
}