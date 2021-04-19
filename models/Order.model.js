const mongoose =require('mongoose');
const Schema = mongoose.Schema;
require('../constans/constans');
require('./User.model');
require('./Product.model');

const ProductOrderSchema = new Schema({

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

}

);


const orderSchema = new Schema (

    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: 'A user needs to be referenced',
            ref: 'User'
        },
        typeMenu: {
            type: String,
            required:true,
            enum: typeMenu
        },
        state: {
            type: String,
            required:true,
            default: 'confirmed',
            enum: stateMenu
        },
        price: {
            type: Number,
            default: 0
        },
        address: {
            type:String,
            required:'An address is required'
        },
        produtsOrder: {
            type: [ProductOrderSchema],
            default:undefined
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

orderSchema.virtual("productsOrder",{
    ref:"ProductOrder",
    foreingnField:"orderId",
    localField: "_id"
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order; 