const express = require('express');
const IndexController = require('./controllers/index'),
    BoardController = require('./controllers/board'),
    AccountController = require('./controllers/account')

module.exports = (app) => {

    app.use('', IndexController);
    app.use('/account', AccountController);
}
