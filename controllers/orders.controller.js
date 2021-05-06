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
            next(createError(404, {errors: {orders : 'Pedido no encontrado'} }))  
        } 

    })
    .catch(next)
};

module.exports.list = (req,res,next) => {
    Order.find( {userId : req.currentUser})
    .populate({
        path: 'productsOrder',
        populate: {
            path: 'productId',
            ref:'Product',
        },
    })
    .then((orders) => {
        if (orders.length){
            res.status(200).json(orders)
        } else {
            next(createError(404, {errors: {orders : 'No se ha realizado ningun pedido'} }))   
        }
    })
    .catch(next)
};
