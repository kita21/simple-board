const express = require('express'),
    passport = require('passport');
// ファイルimport
const models = require("../sequelize/models");

const router = express.Router();

const isLogined = function(req, res, next){
    console.dir(req.user);
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/account/login");
    }
};

const isAdminLogined = function(req, res, next){
    if (!req.isAuthenticated()) {
        res.redirect("/account/login");
    }
    if (req.user.name === 2) {
        res.redirect("/account/login");
    }
    return next();
}

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

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',   //ログイン成功時に遷移したい画面
    failureRedirect: '/account/login', //ログイン失敗時に遷移したい画面
    successFlash: 'ログインしました',
    failureFlash: 'メールアドレスまたはパスワードに誤りがあります',
    // session: true
}));

router.get('/add', isLogined, (req, res, next) => {
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

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/account/login');
});

module.exports = router;