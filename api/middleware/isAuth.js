const passport = require("passport");

// function isAuth(req, res, next) {
//   req.isAuth = true;
//   console.log("youre authed");
//   next();
// }

const isAuth = passport.authenticate("jwt", { session: false });

module.exports = isAuth;
