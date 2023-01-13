const errorHandler = async function(err, req, res, next) {
    customError = {
        statusCode : err.statusCode || 500,
        msg: err.message || 'Something went wrong try again later'
    }

    if(err.code && err.code === 11000){
       customError.statusCode = 400; 
       customError.msg = 'This email already exist, kindly provide another email'
    }

    if(err.name === 'validationError'){
        customError.statusCode = 400;
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
    }

    if(err.name === 'CastError'){
        customError.statusCode = 400; 
        customError.msg = `Unfortunately we could not find any product with id: ${err.value}`
    }
res.status(customError.statusCode).json( {msg: customError.msg});
}

module.exports = errorHandler;