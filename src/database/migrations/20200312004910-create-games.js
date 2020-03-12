'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      game: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      total_kills: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      players: {
        allowNull: true,
        type: DataTypes.JSON
      },
      kills: {
        allowNull: true,
        type: DataTypes.JSON
      },
      log: {
        allowNull: true,
        type: DataTypes.JSON
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Games')
  }
}
