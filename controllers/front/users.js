require('dotenv').config();
const model = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = model.User;
exports.saveUser = async (req,res)=>{
    try {
        const hash = bcrypt.hashSync(req.body.password, +process.env.HASH_SALT);
        const user =  new User(req.body);        
        user.password=hash;
        const doc = await user.save();        
        delete doc.password;
        const token = jwt.sign(doc,process.env.JWT_SALT);        
       return res.json({token,doc});
    } catch (error) {
       return res.status(400).send({error});
    }
}
exports.login=async (req,res)=>{
try {
    let user = await User.findOne({email:req.body.email},'password email firstName maidenName lastName');
    if(!user || !bcrypt.compareSync(req.body.password,user.password)){
        return res.status(401).json({status:0,message:"Your email or password does not match "});
    }
    // return res.send(user);
    // const token = jwt.sign(user,process.env.JWT_SALT);    
   let token= jwt.sign({data:user}, process.env.JWT_HASH, { expiresIn: process.env.JWT_EXPIRE });
    return res.send({token,user});
} catch (error) {
    return res.status(401).json({status:0,message:"Unauthorized",error})
}
}
exports.updateUser = async (req,res)=>{
    try {
        delete req.body.password;
        delete req.body.email;
        const user =  await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
       return res.json(user);
    } catch (error) {
       return res.json(error)
    }
}
exports.getUserDetail = async (req,res)=>{
    try {
        
        const user =  await User.findById(req.payload._id);
       return res.json({user});
    } catch (error) {
       return res.json(error)
    }
}

