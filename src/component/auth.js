const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const models = require('../sequelize/models');
const column = require('../config/column');

exports.passport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    //認証ロジック
    //routerのpassport.authenticate()が呼ばれたらここの処理が走る。
    passport.use(new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password'
        }, function (username, password, done) {
            models.User.findOne({
                where: {
                    name: username,
                    password: password
                }
            }).then(function (User) {
                if (!User) {
                    return done(null, false);
                }
                const sessionData = {
                    'id': User.dataValues.id,
                    'user': username,
                    'role': User.dataValues.role
                }
                return done(null, sessionData);
            });
        }
    ));

    // 認証した際のオブジェクトをシリアライズしてセッションに保存する。
    passport.serializeUser(function (username, done) {
        console.log('serializeUser');
        done(null, username);
    });


    //認証時にシリアライズしてセッションに保存したオブジェクトをデシリアライズする。
    //デシリアライズしたオブジェクトは各routerの req.user で参照できる。
    passport.deserializeUser(function (sessionData, done) {
        done(null, {
            id: sessionData.id,
            name: sessionData.user,
            role: sessionData.role,
        });
    });
}

exports.isLogined = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/user/login");
    }
}

exports.isAdminLogined = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect("/user/login");
    }
    if (req.user.role !== column.role.admin) {
        res.redirect("/user/login");
    }
    return next();
}

