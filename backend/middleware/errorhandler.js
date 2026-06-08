<<<<<<< HEAD
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
    errors: err.errors || null,
    timestamp: new Date().toISOString(),
  });
}

module.exports = errorHandler;
=======
const globalHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        error: message
    });
}
module.exports = globalHandler;
>>>>>>> c6e30be9c1fd962262ba33a28d426ed0e9f59516
