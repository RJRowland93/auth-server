function isAuth(req, res, next) {
  req.isAuth = true;
  console.log("youre authed");
  next();
}

module.exports = isAuth;
