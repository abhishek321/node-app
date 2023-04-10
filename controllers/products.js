const express = require('express')
const router = express.Router();
const model = require('../models/products');
const mongoose = require('mongoose');
const Product = model.Product;
exports.getProducts = async (req,res)=>{
    const products = await Product.find();
    res.json(products);
}
exports.getProduct = async (req,res)=>{
    const id = req.params.id
    const product = await Product.findById(id);
    res.json(product);
}
exports.postProduct = async (req,res)=>{
    try {
        const product = new Product(req.body);
        const doc = await product.save();
          res.json(doc)
    } catch (error) {
          res.json(error);
    }
    
}