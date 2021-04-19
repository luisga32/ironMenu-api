const createError = require('http-errors');
const Order = require('../models/Order.model');



module.exports.create = (req,res,next) => {
    Order.create(req.body)
    .then((order) => res.status(201).json(order))
};
