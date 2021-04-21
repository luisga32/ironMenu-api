const createError = require ('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');


//user sign up

module.exports.create = (req,res,next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            next(createError(400, {errors: {email : 'This email is already in use'} }))            
        } else {
            return User.create(req.body)
            .then( user => res.status(201).json(user));
        }
    })
    .catch(next)
}

//  User get

module.exports.get = (req,res,next) => {
    User.findById(req.currentUser)
    .then((user) => {
        if (!user) {
            next(createError(404, 'User not Found'));
        } else {
            return res.status(200).json(user);
        };
    })
    .catch(next);
};


// User authentication
module.exports.authenticate = (req,res,next) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user =>{
        if (!user) {
            next(createError(404, {errors: { email : 'Email or password are not valid'}}))
        } else {
            return user.checkPassword(password)
            .then(match =>{
                if (!match) {
                    next(createError(404, {errors: { email : 'Email or password are not valid'}}))       
                } else {
                    // Generate JWT token 
                    res.json({
                        access_token: jwt.sign(
                            {   id:user._id   }, //payload
                            process.env.JWT_SECRET || 'Changeme', // secret
                            {
                                expiresIn:'1d'           //options
                            }
                        )
                    })
                }
            })
        }
    })
}