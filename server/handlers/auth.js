const db = require("../models");

exports.register = async (request, response, next) => {
  try{
    const user = await db.User.create(request.body);
    const {id, username} = user;

    response.json({id, username});
  }catch(error){
    next(error);
  }
}

exports.login = async (request, response, next) => {
  try{
    const user = await db.User.findOne({username: request.body.username});
    const {id, username} = user;
    const valid = await user.comparePassword(request.body.password);
    if(valid){
      response.json({
        id,
        username
      });
    } else {
      throw new Error("Invalid Username/Password");
    }
  }catch(error){
    next(error);
  }
}
