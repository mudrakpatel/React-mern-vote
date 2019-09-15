const db = require("../models");

exports.showPolls = async (request, response, next) => {
  try{
    const polls = await db.Poll.
                  find().
                  populate("user", [
                    "username",
                    "id"
                  ]);

    response.status(200).json(polls);
  }catch(error){
    error.status = 400;
    next(error);
  }
};

exports.usersPolls = async (request, response, next) => {
  const {id} = request.decoded;
  console.log(`User id:>>> ${id}`);
  try{
    // const polls = await db.User.findById(id).populate("polls");
    // console.log(`User polls: >>> ${polls}`);
    //return response.status(200).json(user.polls);
    //return response.status(200).json(polls);
    //const user = await db.User.findById(id).populate("polls");
    const user = await db.User.findById(id.toString()).populate("polls");
    console.log(user.polls);
    //return response.status(200).json(user.polls);
    return response.status(200).json(user.polls);
  }catch(error){
    error.status = 400;
    next(error);
  }
}

exports.createPoll = async (request, response, next) => {
  try {
    console.log(`Decoded:>>> ${request.decoded}\n`);
    const { id } = request.decoded;
    const user = await db.User.findById(id);
    //console.log(`User id:>>> ${id}\n`);

    const {question, options} = request.body;
    const poll = await db.Poll.create({
      user,
      question,
      options: options.map(option => ({
          option,
          votes: 0
      }))
    });
    user.polls.push(poll._id);
    await user.save();

    response.status(201).json({
      ...poll._doc,
      user: user._id
    });
    // response.status(200)
    //         .json({"value": "Hello world"});
  }catch(error){
    error.status = 400;
    next(error);
  }
};

exports.getPoll = async (request, response, next) => {
  try {
    const {id} = request.params;
    //console.log(`Poll id:>>> ${id}\n`);

    const poll = await db.Poll.
                 findById(id).
                 populate("user", [
                   "username", "id"
                 ]);

    if(!poll){
      throw new Error("No poll found!");
    }

    response.status(200).json(poll);
  }catch(error){
    error.status = 400;
    next(error);
  }
}

exports.deletePoll = async (request, response, next) => {
  try{
    const {id: pollId} = request.params;
    const {id: userId} = request.decoded;

    const poll = await db.Poll.findById(pollId);
    if(!poll){
      throw new Error("No poll found!");
    }
    if(poll.user.toString() !== userId){
      throw new Error("Unauthorized access");
    }

    await poll.remove();

    response.status(202).json(poll);
  }catch(error){
    error.status = 400;
    next(error);
  }
}

exports.vote = async (request, response, next) => {
  try {
    const {id: pollId} = request.params;
    const {id: userId} = request.decoded;
    const {answer} = request.body;
    console.log(`Answer:>>> ${answer}\n
                 pollId:>>> ${pollId}\n
                 userId:>>> ${userId}\n`);

    if(answer){
      const poll = await db.Poll.findById(pollId);
      console.log(`Poll:>>> ${poll}\n`);

      if(!poll){
        throw new Error("No poll found!");
      }
      const vote = poll.options.map(
        option => {
          if(option.option === answer){
            return {
              option: option.option,
              _id: option._id,
              votes: option.votes + 1
            };
          } else {
            return option;
          }
        }
      );

      if(poll.voted.filter(
        user => user.toString() === userId
      ).length <= 0){
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();

        response.status(202).json(poll);
      } else {
        throw new Error("Already voted!");
      }
    } else {
      throw new Error("No answer provided!");
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
