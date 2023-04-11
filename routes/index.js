const express = require('express');
const { readUsers } = require('../services/lowdb');

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Usuários', users: await readUsers() });
});

module.exports = router;