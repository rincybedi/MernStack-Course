// module.exports = {
//   MONGOURI:
//     "mongodb+srv://rinalsh:d0UgQryTn7ERhVpL@cluster0.sowsw.mongodb.net/test?retryWrites=true&w=majority",

//   // MONGOURI:
//   //   "//rinalsh:d0UgQryTn7ERhVpL@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true",
//   JWT_SECRET: "truhkdsoi9dkjskll",
// };

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
