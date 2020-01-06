'use strict'

module.exports = {
  errorHandler: function(err, req, res, next) {
    let status = null;
    let message = null;

    if (err.name === "JsonWebTokenError") {
      status = 401;
      message = "Please log in first, you are not logged in yet!";
    } else if (err.name === "TokenExpiredError") {
      status = 401;
      message = "Your session is already expired! Please log in again";
    } else if (err.name === "SequelizeValidationError") {
      console.log(err)
      let msg;
      status = 400;
      message = {};
      err.errors.forEach(error => {
      switch (error.validatorKey) {
        case 'isEmail':
          msg = 'Please enter a valid email';
          break;
        case 'len':
          if (error.validatorArgs[0] === error.validatorArgs[1]) {
            msg = 'Use ' + error.validatorArgs[0] + ' characters';
          } else {
            msg = 'Use between ' + error.validatorArgs[0] + ' and ' + error.validatorArgs[1] + ' characters';
          }
          break;
        case 'is_null':
          msg = 'Please complete this field';
          break;
        case 'validateMobile':
          msg = 'Please enter a valid mobile number';
          break;
        case 'validateHome':
          msg = 'Please enter a valid phone number';
          break;
        case 'isUnique':
          msg = error.value + ' is taken. Please choose another one';
          error.path = error.path.replace("_UNIQUE", "");
        }
        message[error.path] = msg;
      });
    } else {
      status = err.status || 500;
      message = err.message || "Internal Server Error";
    }
    res.status(status).json(message);
  }
}