const router = require("express").Router;

const isAuth = require("../middleware/isAuth");
const authService = require("../../services/auth");

const route = router();

module.exports = function(app) {
  app.use("/auth", route);

  route.get("/signup", authService.signup);
  route.get("/login", authService.login);
  route.get("/logout", authService.logout);
  route.get("/test", isAuth, (req, res) =>
    res.json({ hello: "world", isAuth: req.isAuth, isResAuth: res.isAuth })
  );
};
