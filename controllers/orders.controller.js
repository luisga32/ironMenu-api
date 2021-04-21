const createError = require('http-errors');
const Order = require('../models/Order.model');



module.exports.create = (req,res,next) => {
    Order.create(req.body)
    .then((order) => res.status(201).json(order))
    .catch(next)
};

module.exports.get = (req,res,next) => {
    Order.findById(req.params.id)
    .populate({
        path: 'productsOrder',
        populate: {
            path: 'productId',
            ref:'Product',
        },
    })
    .then ((order)=> {
        if (order) {
            res.status(200).json(order)
        } else {
            next(createError(404, {errors: {orders : 'Order not found'} }))  
        } 

    })
    .catch(next)
};

module.exports.list = (req,res,next) => {
    Order.find( {userId : req.body.userId})
    .then((orders) => {
        if (orders.length){
            res.status(200).json(orders)
        } else {
            next(createError(404, {errors: {orders : 'There is not any order'} }))   
        }
    })
    .catch(next)
};
