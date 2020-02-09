// パッケージimport
const express = require('express');
// ファイルimport
const models = require("../sequelize/models");
const auth = require('../services/auth');
// routing
const router = express.Router();

router.get('/login', (req, res) => {
  const message = req.flash();
  const data = {
    title: 'Account/Login',
    form: {name:'', password:''},
    content: '名前とパスワードを入れてください',
    message: message.error
  }
  res.render('account/login', data);
});

router.post('/login', (req, res, next) => {
  auth.authenticate(req, res, next);
});
console.log('aaaaa');
console.dir(auth);
console.dir(auth.isAuthenticated('admin'));
router.get("/logout", auth.isAuthenticated('user'), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get('/add', auth.isAuthenticated('admin'), (req, res, next) => {
  const data = {
    title: 'Account/Add',
    form: {name:'', password:'', comment:''},
    content: '※登録する名前・パスワード・コメントを入力してください',
    message: ''
  }
  res.render('account/add', data);
});

router.post('/add', auth.isAuthenticated, (req, res, next) => {
  models.user.create({
    name : req.body.name,
    password : req.body.password,
    comment : req.body.comment
  }).then(user => {
    return user.save();
  }).then(() => {
    console.log('user save!!');
  }).catch(err => {
    console.log('Not save... : ', err);
  });

  res.redirect('user/login');
});

module.exports = router;
