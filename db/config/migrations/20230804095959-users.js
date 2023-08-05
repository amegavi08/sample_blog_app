'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
      },
      phonenumber: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false,
        required:true,
        validate: {
          isIn: [['male', 'female']] // Validates that the value is either 'male' or 'female'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Users');
  }
};
