const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('../models/Product.model');
const products = require('../constans/products');

require('../config/db.config');

mongoose.connection.once('open', () => {
    console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`)

    mongoose.connection.db.dropDatabase()
        .then(() => console.log('DataBase cleared'))
        .then(() => {
            productsLoad = []
            for (i = 0; i <= products.length - 1; i++) {
                productsLoad.push({
                    title: products[i].title,
                    ingredients: products[i].ingredients,
                    image: faker.image.food,
                    price: products[i].price,
                    course: products[i].course
                })
            }
            return Product.create(productsLoad)

        })
        .then(products => console.log(`${products.length} created`))
        .then(() => console.info('All data created'))
        .catch((error) => console.log(error))
        .finally(() => process.exit(0));
})


