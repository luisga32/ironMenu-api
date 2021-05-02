const router =require('express').Router();
const productsController = require('../controllers/products.controller');
const ordersController = require('../controllers/orders.controller');
const usersController = require('../controllers/users.controllers');
const authMiddleware = require('../middlewares/auth.middleware');



//users routes
router.post('/users',usersController.create);
router.post('/login',usersController.authenticate);
router.get('/users/me',authMiddleware.isAuthoricated,usersController.get);

//products routes
router.get('/products/:id',productsController.get);
router.get('/products',productsController.list);

//orders routes

router.post('/orders',ordersController.create);
router.get('/users/me/orders/:id',ordersController.get);
router.get('/users/me/orders',ordersController.list);



module.exports = router;
