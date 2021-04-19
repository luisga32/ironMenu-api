const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const course = require('../constans/course')
const constants = require('../constans/constans');

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
            type: String,
            required: 'Image is required',
            validate: {
              validator: value => {
                try {
                  const url = new URL(value)
      
                  return url.protocol === 'http:' || url.protocol === 'https:'
                } catch(err) {
                  return false
                }
              },
              message: () => 'Invalid image URL'
            }

        },
        price: {
            type: Number
        },
        course: {
            type: String,
            enum: constants.course
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform : (doc,ret) => {
                ret.id= doc._id
                delete ret._id
                delete ret.__v
                return ret
            }
        }
    }

)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;