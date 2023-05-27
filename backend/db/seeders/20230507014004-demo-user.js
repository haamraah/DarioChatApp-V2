'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'Jasper@Dogs.io',
        username: 'shashu',
        hashedPassword: bcrypt.hashSync('shash')
      },
      {
        email: 'Kutu@Dogs.io',
        username: 'kututu',
        hashedPassword: bcrypt.hashSync('Kutu4Ever')
      },
      {
        email: 'user1@user.io',
        username: 'Fuser',
        hashedPassword: bcrypt.hashSync('1111')
      },
      {
        email: 'user2@user.io',
        username: 'Fuser2',
        hashedPassword: bcrypt.hashSync('2')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
