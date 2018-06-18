// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/neareastbureau_db");

// For Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/articles.js")(app);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});