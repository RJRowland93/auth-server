const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const secret = "chuy";

const UserModel = require("../models/user");

module.exports = function() {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
        secretOrKey: secret
      },
      (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
          return done("jwt expired");
        }
        const user = UserModel.findById(jwtPayload.useruuid);
        if (!user) {
          return done(null, false);
        }

        return done(null, jwtPayload);
      }
    )
  );

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", { session: false });
    }
  };
};
