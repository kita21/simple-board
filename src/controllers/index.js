const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    const message = req.flash();
    console.log(message);
    const data = {
        message: message.success
    }
    res.render('index', data);
});

module.exports = router;