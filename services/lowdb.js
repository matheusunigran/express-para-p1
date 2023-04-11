const { JsonDB, Config } = require('node-json-db');
const { v4 } = require('uuid');

var db = new JsonDB(new Config("db", true, false, '/'));

async function readUsers() {
  return await db.getData('/users');
}

async function createUser(name, cpf, phone) {
  const id = v4();
  db.push('/users[]', {
    id,
    name,
    cpf,
    phone
  })
}

async function deleteUser(id) {
  const index = await db.getIndex("/users", id);
  if (index !== -1)
    db.delete('/users[' + index + ']');
}

async function updateUser(id, name, cpf, phone) {
  const index = await db.getIndex("/users", id);
  var data = await db.getData('/users[' + index + ']');
  name = name || data.name;
  cpf = cpf || data.cpf;
  phone = phone || data.phone;
  if (index !== -1)
    db.push('/users[' + index + ']', { id, name, cpf, phone });
}

module.exports = { readUsers, createUser, deleteUser, updateUser };