const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    const message = req.flash();
    const data = {
        message: message.success
    }
    res.render('index', data);
});

module.exports = router;
