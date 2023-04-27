const  express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const path = require('path');
router.get('/login',userController.login); 
router.post('/',userController.saveUser);

router.get('/user/login',function(req,res){
    return res.render('auth/login');
}); 
router.get('/user/singup',userController.login); 
router.post('/user/singup',userController.saveUser);

exports.router=router; 