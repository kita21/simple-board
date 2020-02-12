const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const models = require('../sequelize/models');

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
                    'user': username,
                    'role': User.dataValues.role,
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
            name: sessionData.user,
            role: sessionData.role,
            msg: 'my message'
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
    if (req.user.name === 2) {
        res.redirect("/user/login");
    }
    return next();
}

