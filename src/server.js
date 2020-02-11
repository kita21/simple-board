// パッケージimport
const express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    flash = require("connect-flash"),
    session = require('express-session'),
    passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const models = require('./sequelize/models');
const AccountController = require('./controllers/account');

const app = express();

app.listen(process.env.PORT || '3000');
console.log("App listening on port 3000");

// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

//認証ロジック
//routerのpassport.authenticate()が呼ばれたらここの処理が走る。
passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    }, function(username, password, done) {
        models.User.findOne({
        where: {
            name: username,
            password: password
        }
        }).then(function (User) {
            if (! User) {
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
passport.serializeUser(function(username, done) {
    console.log('serializeUser');
    done(null, username);
});


//認証時にシリアライズしてセッションに保存したオブジェクトをデシリアライズする。
//デシリアライズしたオブジェクトは各routerの req.user で参照できる。
passport.deserializeUser(function(sessionData, done) {
    done(null, {
        name: sessionData.user,
        role: sessionData.role,
        msg:'my message'
    });
});

// ファイルimport
const router = require('./route');

router(app);
// module.exports = app;
