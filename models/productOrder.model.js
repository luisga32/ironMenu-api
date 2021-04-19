const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require ('./Order.model');
require ('./Product.model');

const ProductOrderSchema = new Schema (

    {
        orderId:  {
            type:mongoose.Types.ObjectId,
            required:'Id order needs to be referenced',
            ref:'Order'
        },
        productId: {
            type:mongoose.Types.ObjectId,
            required:'Id product needs to be referenced',
            ref:'Product'
        },
        price: {
            type: Number,
            default: 0
        }, 
        quantity:{
            type: Number,
            default:0
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


const ProductOrder = mongoose.model('ProductOrder',ProductOrderSchema);

module.exports = ProductOrder;
