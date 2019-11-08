const router = require("express").Router;

const userModel = require("../../models/user");

const route = router();

module.exports = function(app) {
  app.use("/user", route);

  route.get("/create/:name", (req, res) => {
    const { name } = req.params;
    const user = userModel.create(name);
    res.send(user);
  });

  route.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = userModel.findById(id);
    res.send(user);
  });
};
