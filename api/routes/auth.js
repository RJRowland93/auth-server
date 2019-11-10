const router = require("express").Router;

const isAuth = require("../middleware/isAuth");
const authService = require("../../services/auth");

const route = router();

module.exports = function(app) {
  app.use("/auth", route);

  route.get("/signup", authService.signup);
  route.get("/signin", authService.signin);
  route.get("/signout", authService.signout);
  route.get("/test", isAuth, (req, res) => res.json({ hello: "world", res }));
};
