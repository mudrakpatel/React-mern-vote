const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true})
        .then(
          () => {
            console.log(">>> MongoDb connected <<<");
          },
          (error) => {
            console.log(`>>> MongoDb ERROR!\n --- ${error}`);
          }
        );

module.exports.User = require("./user");
module.exports.Poll = require("./poll");
