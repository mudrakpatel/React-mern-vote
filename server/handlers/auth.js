const jasonWebToken = require("jsonwebtoken");
const db = require("../models");

exports.register = async (request, response, next) => {
  try{
    const user = await db.User.create(request.body);
    const {id, username} = user;
    const token = jasonWebToken.sign({id, username}, process.env.SECRET);

    response.status(201).json({
      id,
      username,
      token
    });
  }catch(error){
    if(error.code === 11000){
      error.message = "Sorry, that username is already taken";
    }

    next(error);
  }
}

exports.login = async (request, response, next) => {
  try{
    const user = await db.User.findOne({username: request.body.username});
    const {id, username} = user;
    const valid = await user.comparePassword(request.body.password);
    if(valid){
      const token = jasonWebToken.sign({id, username}, process.env.SECRET);
      response.json({
        id,
        username,
        token
      });
    } else {
      throw new Error("Invalid Username/Password");
    }
  }catch(error){
    error.message = "Invalid Username/Password";
    next(error);
  }
}
