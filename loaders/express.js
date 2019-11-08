const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
// const User = require("./models/user");
const uuidv4 = require("uuid/v4");
const routes = require("../api");

module.exports = app => {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use("/api", routes());

  app.get("/", (req, res) => {
    const uuid = uuidv4();
    return res.json({ success: false, hello: "world", uuid, chuy: "boi" });
  });

  app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });
};
