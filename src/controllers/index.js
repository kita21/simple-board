const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    const message = req.flash();
    // const message = flash.msg;
    // const loginMsg = flash.success;
    // console.log(message);
    // console.log(loginMsg);
    const data = {
        msg: message.msg,
        loginMsg: message.success
    }
    res.render('index', data);
});

module.exports = router;