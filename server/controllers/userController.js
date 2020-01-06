"use strict"

const { User } = require('../models');
const { validatePass } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class userController {

  static register(req, res, next) {
    const { name, password, email, avatar } = req.body
    User.create({name, password, email, avatar})
      .then((user) => {
        res.status(201).json(user)
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne({where: {email: req.body.email}})
      .then(user => {
        if (!user) {
          let err = {
            status: 401,
            msg: "Email and/or password incorrect"
          };
          next(err);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = {
            id : user.id
          };
          let token = generateToken(payload);
          res.status(200).json({access_token: token})
        } else {
          let err = {
            status: 401,
            msg: "Email and/or password incorrect"
          };
          next(err);
        }
      })
      .catch(next)
  }

}

module.exports = userController;