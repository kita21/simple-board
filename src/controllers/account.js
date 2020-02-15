const express = require('express');
// ファイルimport
const models = require("../sequelize/models");
const auth = require('../component/auth');
const column = require('../config/column');

const router = express.Router();

router.get('/',  auth.isAdminLogined, (req, res) => {
    const message = req.flash();
    console.log(message);
     models.User.findAll().then(userList => {

         const data = {
             userList: userList,
             msg: message.msg
         }
         res.render('account/index', data);
    });
});

router.get('/create', auth.isAdminLogined, (req, res) => {
    res.render('account/create');
});
router.post('/create', (req, res) => {
    models.User.create({
        name : req.body.name,
        password : req.body.password,
        role: req.body.role,
        comment : req.body.comment
    }).then(user => {
        return user.save();
    }).then(() => {
        console.log('user create!!');
    }).catch(err => {
        console.log('Not create... : ', err);
    });
    res.redirect('/account');
});

router.get('/edit/:id', auth.isAdminLogined, (req, res) => {
    models.User.findOne({
        where: {id: req.params.id}
    }).then(user => {
        const data = {
            user: user
        }
        res.render('account/edit', data);
    })
});
router.post('/edit', auth.isAdminLogined, (req, res) => {
    models.User.upsert({
        id: req.body.name,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        comment: req.body.comment
    }).then(() => {
        res.flash('msg', 'id: ' + req.body.name + ' 編集しました');
        res.redirect('/account');
    });
});

router.post('/delete', auth.isAdminLogined, (req, res) => {
    models.User.destroy({
        where: {id: req.body.id}
    }).then(id => {
        req.flash('msg', 'ユーザID:' + id + 'を削除しました');
        res.redirect('/account');
    }).catch(err => {
        console.log(err);
        req.flash('msg', 'ユーザID:' + err + 'の削除に失敗しました');
        res.redirect('/account');
    });
});


module.exports = router;