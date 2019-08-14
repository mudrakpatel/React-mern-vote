require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//excact file path not required since the name is index.js
const db = require("./models");
const routes = require("./routes");
const handle = require("./handlers");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({value: "Hello world"});
});
app.use("/api/auth", routes.auth);

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port,
  console.log(`Node server for mern-vote running on port ${port}...`));
