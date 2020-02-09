// パッケージimport
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
// ファイルimport
const models = require('../sequelize/models');
const cfAuth = require('../config/auth');

class Auth {
    static initialize(app) {
        // passportの初期化
        app.use(passport.initialize());

        // セッション管理をするための設定
        app.use(passport.session());

        // passport が ユーザー情報をシリアライズすると呼び出されます
        passport.serializeUser((user, done) => {
            console.log('Serialize ...');
            done(null, user);
        });
        // passport が ユーザー情報をデシリアライズすると呼び出されます
        passport.deserializeUser((user, done) => {
            console.log('Deserialize ...');
            done(null, user);
        });
    }

    static setStrategy() {
        // passport.use：ストラテジーの設定
        // ストラテジー：ユーザIDとパスワードを用いた懸賞やOAuthを用いた権限付与、OpenIDを用いた分散認証を実装する
        // localStrategy：ユーザIDとパスワードを用いた認証の実装部分
        passport.use(new LocalStrategy({
                usernameField: 'name',
                passwordField: 'password',
                // TODO: あとで意味調べる
                // passReqToCallback: true
            }, (name, password, done) => {
                models.user.findOne({
                    where: {name: name}
                }).then((user) => {
                    // 認証に成功したらユーザ情報を返す
                    if (!user) {
                        return done(null, false);
                    }
                    if (user.dataValues.password !== password) {
                        return done(null, false);
                    }
                    return done(null, user.dataValues);
                }).catch((err) => {
                    return done(err);
                });
            }
        ));
    }

    static authenticate(req, res, next) {
        passport.authenticate(
            'local',
            {
                successRedirect: cfAuth.redirect.success,
                failureRedirect: cfAuth.redirect.failure,
                successFlash: 'ログインしました',
                failureFlash: 'メールアドレスまたはパスワードに誤りがあります'
            }
        )(req, res, next);
    }

    // ログイン済みか確認
    // static isAuthenticated(req, res, next) {
    //     // ログイン済み
    //     if (req.isAuthenticated()) {
    //         return next();
    //     }
    //     // ログインしてなかったらログイン画面に飛ばす
    //     res.redirect(cfAuth.redirect.failure);
    // };

}

// ログイン済みか確認
module.exports.isAuthenticated = function (role) {
    return ((req, res, next) => {
        // ログイン済み
        if (req.isAuthenticated()) {
            // console.log(cfAuth.role);
            next();
        }
        // ログインしてなかったらログイン画面に飛ばす
        res.redirect(cfAuth.redirect.failure);
    }).then(() => {
        const roleList = cfAuth.role[role];
        // 権限確認
        console.log(roleList);
        console.log(req.user);
        if (roleList.includes(req.user)) {
            next();
        }
        res.redirect(cfAuth.redirect.failure);
    })
};

module.exports.Auth = Auth;
