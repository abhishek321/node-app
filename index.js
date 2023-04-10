require('dotenv').config();
const mongoose = require('mongoose');
const handleError = (err)=>{
    console.log(err);
      }
mongoose.connect(process.env.DB_CONN_URL).then(()=>{
    console.log('Mongo connected')
}).catch(error => handleError(error));
// mongoose.connect('mongodb://127.0.0.1:27017/nda_check').then(()=>{
//     console.log('Mongo connected')
// }).catch(error => handleError(error));
const express = require('express');
const server = express();
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const productRouter = require('./routes/products');
server.use(cors());
server.use(express.json());
server.use(logger('default'));
server.use(express.static(path.resolve(__dirname,'public','index.html')));
server.use('/products',productRouter.router);  
server.listen(process.env.PORT,(req,res)=>{console.log(process.env.PORT);
})
