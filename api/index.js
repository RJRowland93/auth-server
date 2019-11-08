const router = require("express").Router;

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const routes = router();

module.exports = function() {
  authRouter(routes);
  userRouter(routes);

  return routes;
};
