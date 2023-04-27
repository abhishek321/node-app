const mongoose = require('mongoose');
const {Schema} = mongoose;
const schemaProduct = new Schema({
    title:{type:String,required:true,unique:true},
    price:{type:Number,required:true,min:[1,"Enter price greater than 1"]},
    description:{type:String,default:''},
    rating:{type:Number,default:0},
    discountPercentage:{type:Number,default:0},
    brand:{type:String,required:[true,'Brand is required'],min:3},
    category:{type:String,required:[true,'Category is required'],min:3},
    thumbnail:{type:String,default:'https://i.dummyjson.com/data/products/1/thumbnail.jpg'},
    date:{type:Date, default: Date.now}

});
exports.Product = mongoose.model('Product',schemaProduct);