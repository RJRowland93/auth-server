function signup(req, res) {
  return res.send("signup");
}

function login(req, res) {
  return res.send("login");
}

function logout(req, res) {
  return res.send("logout");
}

module.exports = {
  signup,
  login,
  logout
};
