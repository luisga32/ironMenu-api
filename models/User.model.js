const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema (
    {
        name:{
        type: String,
        required: 'Name is requested'
        },
        surname: {
            type: String,
            required: 'Name is requested'
        },
        email: {
            type: String,
            required: 'Email is required',
            unique: true,
            match: [EMAIL_PATTERN, 'Email is not valid']
        },
        password: {
            type:String,
            required: 'Password is required',
            minLength: [8, 'Password must have 8 characters or more']
        },
        address: {
            type:String

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

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      bcrypt.hash(this.password, SALT_WORK_FACTOR)
        .then(hash => {
          this.password = hash
          next()
        })
    } else {
      next()
    }
  })
  
  userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
  };
  

const User = mongoose.model('User',userSchema);
module.exports = User;
