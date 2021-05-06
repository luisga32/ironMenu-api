const createError = require('http-errors');
const Product = require('../models/Product.model');

module.exports.list = (req, res, next) => {

    const { course } = req.query;
    let query = {};
    if (course) {
        query = { course: course }

    };

    Product.find(query)
    .then (products => {
        if (products) {
            res.json(products)
        } else {
            next(createError(404, {errors: {products : 'Productos no encontrados'} }))  
        }
        
    })
    .catch(next)

}

module.exports.get = (req, res, next) => {
    Product.findById(req.params.id)
    .then ((product)=> {
        if (product) {
            res.json(product)
        } else {
            next(createError(404, {errors: {products : 'Producto no encontrado'} }))  
        } 

    })
    .catch(next)
}

