const express = require('express');
// ファイルimport
const models = require("../sequelize/models");
const auth = require('../component/auth');
const column = require('../config/column');

const router = express.Router();

router.get('/',  (req, res) => {
     models.User.findAll().then(userList => {
         const data = {
             userList: userList
         }
         res.render('account/index', data);
    });
});

router.get('/create', auth.isAdminLogined, (req, res) => {
    res.render('account/create');
});
router.post('/create', auth.isAdminLogined, (req, res) => {
    models.User.create({
        name : req.body.name,
        password : req.body.password,
        role: req.body.role,
        comment : req.body.comment
    }).then(user => {
        return user.save();
    }).then(() => {
        console.log('user save!!');
    }).catch(err => {
        console.log('Not save... : ', err);
    });
    res.redirect('/account');
});

router.get('/edit/:id', (req, res) => {
    console.dir(req.params.id);
    models.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        data = {
            user: user
        }
        res.render('account/edit', data);
    })
});

module.exports = router;