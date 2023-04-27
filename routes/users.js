const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authenticate = require('../middleware/authenticate');
router.get('/',authenticate,userController.getUserDetail);
exports.router=router;