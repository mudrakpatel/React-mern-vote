const express = require("express");
const handle = require("./handlers/index");

const app = express();
const port = 4000;

app.get("/", (request, response) => {
  response.json({value: "Hello world"});
});

app.use(handle.notFound);

app.use(handle.errors);

app.listen(port,
  console.log(`Node server for mern-vote running on port ${port}...`));
