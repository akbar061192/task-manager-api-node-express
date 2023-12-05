const { CustomError } = require("../errors/CustomError");

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  return res.status(500).json({ success: false, err });
};

module.exports = ErrorHandler;
