'use strict';

const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function(value, next) {
          User.findOne({
            where: {email: value},
            attributes: ['id']
          })
            .done(function(err, user) {
              if (err)
                return next(err);
              if (user)
                return next('Email address already in use!');
              next();
            });

        }
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8,20]
      },
      allowNull: false
    },
    avatar: DataTypes.STRING,
  }, {
    hooks: {
    beforeCreate: (user, options) => {
      user.password = hashPass(user.password);
    }},
    sequelize });

  User.associate = function(models) {
    User.hasMany(models.Contact);
  };
  return User;
};