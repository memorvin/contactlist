'use strict'

const express = require('express')
const router = express.Router()
const users = require('./users')
const contacts = require('./contacts')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  console.log('Welcome to contact list app!')
})

router.use('/users', users)
router.use(authentication)
router.use('/contacts', contacts)

module.exports = router;