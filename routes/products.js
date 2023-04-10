const express = require('express')
const router = express.Router();
const productController = require('../controllers/products');
// define the home page route
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.postProduct);
  // define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
  })
  exports.router = router;