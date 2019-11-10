function assembleAuthHeader(req, res, next) {
  const { jwtPayload, jwtSignature } = req.cookies;
  //   if (!jwtPayload || !jwtSignature) {
  //     return res.status(401).send("not authorized");
  //   }
  req.headers["Authorization"] = [jwtPayload, jwtSignature].join(".");
  next();
}

module.exports = assembleAuthHeader;
