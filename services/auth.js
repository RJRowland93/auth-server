const UserModel = require("../models/user");

async function signup(req, res) {
  const { body, query } = req;
  const { username, password } = query || body;

  if (UserModel.findByEmail(username)) {
    res.status(400).send("user already exists");
  }

  try {
    const user = await UserModel.create(username, password);

    const [head, body, sig] = UserModel.generateToken(user.id);

    res
      .status(200)
      .cookie("jwtPayload", `${head}.${body}`, {
        // secure: true
      })
      .cookie("jwtSignature", sig, {
        // secure: true,
        // httpOnly: true
      })
      .send(user);
  } catch (error) {
    res.status(400).send({
      error: "req body should take the form { username, password }"
    });
  }
}

async function signin(req, res) {
  const { body, query } = req;
  const { username, password } = query || body;

  try {
    const user = await UserModel.findByCreds(username, password);
    if (!user) {
      res.status(400).send("no user found");
    }

    const [head, body, sig] = UserModel.generateToken(user.id);

    res
      .status(200)
      .cookie("jwt-payload", `${head}.${body}`, {
        // secure: true
      })
      .cookie("jwt-signature", sig, {
        // secure: true,
        // httpOnly: true
      })
      .send(user);
  } catch (error) {
    res.status(400).send({
      error: "req body should take the form { username, password }"
    });
  }
}

function signout(req, res) {
  return res
    .status(200)
    .clearCookie("jwtPayload")
    .clearCookie("jwtSignature")
    .send("signout");
}

module.exports = {
  signup,
  signin,
  signout
};
