// パッケージimport
const express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    flash = require("connect-flash"),
    session = require('express-session');

const router = require('./route');
const auth = require('./component/auth');
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

// 認証
auth.passport(app);
// ルーティング
router.routing(app);
module.exports = app;
