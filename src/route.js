const express = require('express');
const BoardController = require('./controllers/board'),
    AccountController = require('./controllers/account')

module.exports = (app) => {

    app.use('/account', AccountController);
}
