const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require("../sequelize/models");
const config = require('../config/config');

router.get('/', 'authenticate', (req, res) => {
    res.render('index');
});