const jwt =require('jsonwebtoken');
const createError = require('http-errors');

module.exports.isAuthoricated = (req,res,next) =>{
    // Get Authorization header

    const authHeader = req.header('Authorization');
    console.log(authHeader)
    if (authHeader) {
        //Check Auth protocol
        const authProtocol = authHeader.split(' ')[0];
        console.log('authProtocol: ', authProtocol);
        if (authProtocol === 'Bearer') {
            // Verify token
            console.log('Beaber')
            jwt.verify(
                authHeader.split(' ')[1] || ' ',
                process.env.JWT_SECRET,
                (error,decoded) =>{
                    if (error) {
                        console.log('Error verify')
                        next(error)
                    } 
                    if (decoded) {

                        req.currentUser = decoded.id;
                        console.log('current user: ', req.currentUser)
                        next();
                    }
                }
            );
        
        } else {
            next(createError(401))
        }
    } else {
        next(createError(401))
    }
}