const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/todolist");
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(routes);

app.listen(3000);
