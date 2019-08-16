module.exports = {
  ...require("./auth")
}

module.exports.errors = (error, request, response, next) => {
  response.status(error.status || 400).json({
    error: error.message || "Something went wrong!"
  });
};

module.exports.notFound = (request, response, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
};
