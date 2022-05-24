const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.name}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. please use another value`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // operational trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programing or unknown error: dont leak error details
  } else {
    console.error('Error ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    let error = err;
    // eslint-disable-next-line no-return-assign
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);

    sendErrorProd(error, res);
  }
};
