const router =require('express').Router();
const productsController = require('../controllers/products.controller');
const ordersController = require('../controllers/orders.controller');
const usersController = require('../controllers/users.controllers');
const authMiddleware = require('../middlewares/auth.middleware');



//users routes
router.post('/login',usersController.authenticate);
router.get('/users/me/orders/:id',authMiddleware.isAuthoricated,ordersController.get);
router.get('/users/me/orders',authMiddleware.isAuthoricated,ordersController.list);
router.get('/users/me',authMiddleware.isAuthoricated,usersController.get);
router.post('/users',usersController.create);


//products routes
router.get('/products/:id',productsController.get);
router.get('/products',productsController.list);



//orders routes

router.post('/orders',authMiddleware.isAuthoricated,ordersController.create);





module.exports = router;
