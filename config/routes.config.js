const router =require('express').Router();
const productsController = require('../controllers/products.controller');


//products routes
router.get('/products',productsController.list);
router.get('/products/:id',productsController.get);


module.exports = router;
