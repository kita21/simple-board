const express = require('express'),
    passport = require('passport');
// ファイルimport
const models = require("../sequelize/models");
const auth = require('../component/auth');

const router = express.Router();

router.get('/login', (req, res) => {
    const message = req.flash();
    const data = {
        title: 'Account/Login',
        form: {name:'', password:''},
        content: '名前とパスワードを入れてください',
        loginMsg: message.error
    }
    res.render('user/login', data);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',   //ログイン成功時に遷移したい画面
    failureRedirect: '/user/login', //ログイン失敗時に遷移したい画面
    successFlash: 'ログインしました',
    failureFlash: 'メールアドレスまたはパスワードに誤りがあります',
    // session: true
}));

router.get('/create', auth.isLogined, (req, res, next) => {
    const data = {
        title: 'アカウント作成',
        form: {name:'', password:'', comment:''},
        content: '※登録する名前・パスワード・コメントを入力してください',
        message: ''
    }
    res.render('user/create', data);
});

router.post('/create', auth.isLogined, (req, res) => {
    models.User.create({
        name : req.body.name,
        password : req.body.password,
        role: 1,
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

router.get('/logout', auth.isLogined, (req, res) => {
    req.logout();
    req.flash('msg', 'ログアウトしました');
    res.redirect('/');
});

module.exports = router;