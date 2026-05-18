
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (err.statusCode >= 500) {
        console.log("Unexpected error", { msg: err.message, stack: err.stack, method: req.method, path: req.path })
    } else {
        console.log("Operational error", { msg: err.message, statusCode: err.statusCode, method: req.method, path: req.path })
    }

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });
};

export default errorHandler;