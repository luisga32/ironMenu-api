const createError = require('http-errors');
const Order = require('../models/Order.model');



module.exports.create = (req,res,next) => {
    Order.create(req.body)
    .then((order) => res.status(201).json(order))
};

module.exports.get = (req,res,next) => {
    Order.findById(req.params.id)
    .then ((order)=> {
        if (order) {
            res.json(order)
        } else {
            next(404,'Order not found')
        } 

    })
    .catch(next)
};

module.exports.list = (req,res,next) => {
    Order.find( {userId : req.body.userId})
    then( (orders) => {
        res.status(201).json(orders)
    })
}
