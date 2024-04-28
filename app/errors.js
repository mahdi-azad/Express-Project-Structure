//error handler middleware 3 parameters
const notFoundHandler = (req, res, next) => {
    const error = new Error('resources not found');
    error.status = 404;
    next(error);
}

//global error handler 4 parameters
const globalErrorhandler = (error, req, res, next) => {
    if (error.status) {
        return res.status(error.status).json({
            message: error.message
        })
    }
    res.status(500).json({
        message: 'server error occured'
    })
}


module.exports = {
    notFoundHandler,
    globalErrorhandler
}