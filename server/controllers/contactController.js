"use strict"

const { Contact } = require('../models');

class contactController {

  static create(req, res, next) {
    const { name, company, email, mobile, home, picture } = req.body
    Contact.create({ name, company, email, mobile, home, picture, UserId: req.decoded.id})
      .then(contact => {
        res.status(201).json(contact)
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    Contact.findAll(
      {where: {UserId: req.decoded.id}},
      {order: [['id', 'ASC']]
    })
      .then(contacts => {
        res.status(200).json(contacts)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    Contact.findByPk(req.params.id)
      .then(contact => {
        res.status(200).json(contact)
      })
      .catch(next)
  }

  static remove(req, res, next) {
    Contact.destroy({where: {id: req.params.id}})
      .then(() => {
        res.status(200).json({message: `Successfully deleted record ${req.params.id}`})
      })
      .catch(next)
  }

  static update (req, res, next) {
    let { name, company, email, mobile, home, picture } = req.body
    Contact.update(
      {name, company, email, mobile, home, picture},
      {where: {id: req.params.id}}
    )
      .then(() => {
        res.status(200).json({message: `Successfully udpated record ${req.params.id}`})
      })
      .catch(next)
  }

}

module.exports = contactController;