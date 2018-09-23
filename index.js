"use strict"

const express = require("express");
const eql = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use("/", eql({
  schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log("Service is ready at http://localhost:8080");
});

process.on("SIGINT", () => {
  console.log("Service will shutdown now");
  process.exit(1);
})