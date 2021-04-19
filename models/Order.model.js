const mongoose =require('mongoose');
const Schema = mongoose.Schema;
require('../constans/constans');
require('./User.model');
require('./productOrder.model')

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
        date: { 
            type: Date, 
            default: Date.now 
        },
        address: {
            type:String,
            required:'An address is required'
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