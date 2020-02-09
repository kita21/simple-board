const express = require('express');
// ファイルimport
const models = require("../sequelize/models");

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

router.post('/login', (req, res) => {
    models.User.findOne({
        where: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function (User) {
        if (! User) {
            req.flash('msg', 'ユーザ名かパスワードが違います');
            res.redirect('login');
        }
        req.flash('msg', 'ログインしました');
        res.redirect('/index');
    });
});

router.get('/add', (req, res) => {
    const data = {
        title: 'アカウント作成',
        form: {name:'', password:'', comment:''},
        content: '※登録する名前・パスワード・コメントを入力してください',
        message: ''
    }
    res.render('account/add', data);
});

router.post('/add', (req, res) => {
    models.User.create({
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