const express = require('express');
const IndexController = require('./controllers/index'),
    BoardController = require('./controllers/board'),
    UserController = require('./controllers/user')

exports.routing = (app) => {

    app.use('', IndexController);
    app.use('/user', UserController);
}
