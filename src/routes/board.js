const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require("../sequelize/models");
const config = require('../sequelize/config/config');

router.get('/', 'authenticate', (req, res) => {
    res.render('index');
});