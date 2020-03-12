module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    game: DataTypes.INTEGER,
    total_kills: DataTypes.INTEGER,
    players: DataTypes.JSON,
    kills: DataTypes.JSON,
    log: DataTypes.JSON
  })

  return Games
}
