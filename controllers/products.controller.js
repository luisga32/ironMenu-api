const createError = require('http-errors');
const Product = require('../models/Product.model');

module.exports.list = (req, res, next) => {

    const { order } = req.query;
    const query = {};
    if (order) {
        query = { order: order }

    };

    Product.find(query)
    .then (products => res.json(products))
    .catch(next)

}

module.exports.get = (req, res, next) => {
    Product.findById(req.params.id)
    .then ((product)=> {
        if (product) {
            res.json(product)
        } else {
            next(404,'Meal not found')
        } 

    })
    .catch(next)
}

