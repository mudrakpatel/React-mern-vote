const jsonWebToken = require("jsonwebtoken");

module.exports = (request, response, next) => {
  if(request.headers["authorization"]){
    const token = request.headers["authorization"].split(" ")[1];
    jsonWebToken.verify(token,
      process.env.SECRET,
      (error, decoded) => {
        if(error){
          next(Error("Failed to authenticate token"));
        }else{
          request.decoded = decoded;
          next();
        }
      });

  }else{
    next(Error("No token provided"));
  }
}
