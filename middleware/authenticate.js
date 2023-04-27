const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
try {
  if(!req.headers.authorization){
  return res.json({status:0,message:"Token missing in request!"})
}
const bearerToken = req.headers.authorization;
const token = bearerToken.split(" ")[1];
const {data} = jwt.decode(token);
  if(!data){
    return res.json({status:0,message:"Wrong token send in request!"})
  }else{
    req.payload=data;
    next();
  }
} catch (error) {
    return res.json({status:0,message:"Unauthorized",error})
}
};