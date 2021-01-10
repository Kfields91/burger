const express = require("express");
const mysql = require("mysql");

// require("dotenv").config();

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controllers");
// const orm = require("./config/orm");

app.use(routes);

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
