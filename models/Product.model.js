const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const course = require('../constans/course')

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: 'Title is requested'
        },
        ingredients: {
            type: String
        },
        image: {
            type: String

        },
        price: {
            type: Number
        },
        course: {
            type: [String],
            enum: course
        }
    },
    {
        toJSON: {
            virtuals: true,
            transform : (doc,ret) => {
                ret.id= doc._id
                delete ret._id
                return ret
            }
        }
    }

)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;