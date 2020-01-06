'use strict';

const { User } = require('./index')

module.exports = (sequelize, DataTypes) => {
  class Contact extends sequelize.Sequelize.Model{}
  Contact.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validateMobile: function(value, next) {
          if(!/(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/i.test(value)) { 
            return next('Mobile number format error!')
          } else {
            next()
          }
        }     
      }
    },
    home: {
      type: DataTypes.STRING,
      validate: {
        validateHome: function(value, next) {
          if(!/(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/i.test(value)) { 
            return next('Home number format error!')
          } else {
            next()
          }
        }  
      }
    },
    picture: {
      type: DataTypes.STRING
    },
    UserId: DataTypes.INTEGER,
  }, { sequelize });
  
  Contact.associate = function(models) {
    Contact.belongsTo(models.User);
  };
  return Contact;
};