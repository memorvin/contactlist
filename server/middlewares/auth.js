'use strict'

const { verifyToken } = require('../helpers/jwt.js')
const { User, Contact } = require('../models')

module.exports = {
  authentication (req, res, next) {
    if (!req.headers.access_token) {
      throw { errorCode: 401, message: "You must log in first" }
    }
    try {
      req.decoded = verifyToken(req.headers.access_token)
      User.findByPk(req.decoded.id)
        .then(user => {
          if (user) {
            next()
          } else {
            next({ status: 401, message: "Invalid access" })
          }
        })
        .catch(err => {
          next(err)
        })
    } catch(err) {
      next(err)
    }
  },

  authorization (req, res, next) {
    Contact.findByPk(req.params.id)
      .then(data => {
        if (data) {
          if (String(data.UserId) === String(req.decoded.id)) {
            next();
          } else {
            next({ status: 403, message: "Unauthorized process" });
          }
        } else {
          next({ status: 404, message: `Contact not found` });
        }
      })
      .catch(next)
  }
}