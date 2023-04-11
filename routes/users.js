const express = require('express');
const { readUsers, createUser, deleteUser, updateUser } = require('../services/lowdb');

var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await readUsers();
  res.send(users);
});

router.post('/create', async function (req, res, next) {
  const { nome, cpf, telefone } = req.body;
  if (nome.trim() && cpf.trim() && telefone.trim()) {
    await createUser(nome, cpf, telefone);
    res.sendStatus(200);
    res.end();
  } else {
    res.sendStatus(400);
    res.end();
  }
});

router.post('/update', async function (req, res, next) {
  const { id, nome, cpf, telefone } = req.body;
  if (id && (nome.trim() || cpf.trim() || telefone.trim())) {
    const users = await readUsers();
    const id_user = users.find(user => user.id == id);
    if (id_user) {
      await updateUser(id, nome, cpf, telefone);
      res.sendStatus(200);
      res.end();
    } else {
      res.sendStatus(404);
      res.end();
    }
  } else {
    res.sendStatus(400);
    res.end();
  }
});

router.delete('/delete', async function (req, res, next) {
  const { id } = req.body;
  if (id) {
    const users = await readUsers();
    const id_user = users.find(user => user.id == id);
    if (id_user) {
      await deleteUser(id);
      res.sendStatus(200);
      res.end();
    } else {
      res.sendStatus(404);
      res.end();
    }
  } else {
    res.sendStatus(400);
    res.end();
  }
});

module.exports = router;