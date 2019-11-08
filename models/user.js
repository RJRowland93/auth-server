const userStore = [];
let id = 0;

function create(name) {
  const newUser = { name, id };
  id++;
  userStore.push(newUser);
  return newUser;
}

function findById(id) {
  return userStore[id];
}

module.exports = {
  create,
  findById
};
