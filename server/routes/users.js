"use strict"

const router = require('express').Router();
const userController = require('../controllers/userController.js')

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;