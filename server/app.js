const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

app.use(cors);
// Mongoose Connection
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDb");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongoDb", err);
});

//Register Models
require("./models/user");
require("./models/post");
//Use models
mongoose.model("User");
mongoose.model("Post");

// Middlewares/ Register routes
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
  console.log("Running at", PORT);
});
