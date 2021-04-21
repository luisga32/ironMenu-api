const router =require('express').Router();
const productsController = require('../controllers/products.controller');
const ordersController = require('../controllers/orders.controller');
const usersController = require('../controllers/users.controllers');


//users routes
router.post('/users',usersController.create);
router.post('/login',usersController.authenticate);
router.get('/users/me',usersController.get);

//products routes
router.get('/products',productsController.list);
router.get('/products/:id',productsController.get);

//orders routes

router.post('/orders',ordersController.create);
router.get('/users/me/orders',ordersController.list);
router.get('/users/me/orders/:id',ordersController.get);



module.exports = router;
