const mongoose = require('mongoose');
const {Schema} = mongoose;
const schemaProduct = new Schema({
    title:{type:String,required:true,unique:true},
    price:{type:Number,required:true,min:[1,"Enter price greater than 1"]},
    description:{type:String,default:''},
    date:{type:Date, default: Date.now}

});
exports.Product = mongoose.model('Product',schemaProduct);