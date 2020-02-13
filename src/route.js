const IndexController = require('./controllers/index'),
    BoardController = require('./controllers/board'),
    UserController = require('./controllers/user'),
    AccountController = require('./controllers/account');

exports.routing = (app) => {

    app.use('', IndexController);
    app.use('/user', UserController);
    app.use('/account', AccountController);
}
