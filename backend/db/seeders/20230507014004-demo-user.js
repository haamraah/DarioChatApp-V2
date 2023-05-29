'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      
      {
        firstname:'kutu',
        lastname :'khamse',
        email: 'Kutu@Dogs.io',
        username: 'kututu',
        hashedPassword: bcrypt.hashSync('Kutu4Ever')
      },
      {
        firstname:'fake',
        lastname :'khamse',
        email: 'user1@user.io',
        username: 'Fuser',
        hashedPassword: bcrypt.hashSync('1111')
      },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['kututu', 'Fuser'] }
    }, {});
  }
};
