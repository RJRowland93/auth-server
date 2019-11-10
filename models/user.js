const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");

const secret = "chuy";
const hashCost = 10;

const userStore = [];
let id = 0;

async function create(email, pwd) {
  const passwordHash = await bcrypt.hash(pwd, hashCost);
  const newUser = { id, useruuid: uuidv4(), email, password: passwordHash };
  id++;
  userStore.push(newUser);
  const { password, ...user } = newUser;
  return user;
}

function findById(id) {
  const { password, ...user } = userStore[id];
  return user;
}

function findByEmail(email) {
  return userStore.find(user => user.email === email);
}

async function findByCreds(email, password) {
  const { password: passwordHash, ...user } =
    userStore.find(user => user.email === email) || {};
  try {
    const isPasswordMatch = await bcrypt.compare(password, passwordHash);
    if (!isPasswordMatch) {
      return null;
    }
    return user;
  } catch (e) {
    console.log(e);
  }
}

function generateToken(id) {
  const token = jwt.sign({ useruuid: id, jti: uuidv4() }, secret, {
    expiresIn: "1h"
  });

  return token.split(".");
}

module.exports = {
  create,
  findById,
  findByEmail,
  findByCreds,
  generateToken
};
