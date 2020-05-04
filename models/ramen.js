'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ramen = sequelize.define('Ramen', {
    Nom: DataTypes.STRING,
    Marque: DataTypes.STRING,
    Gout: DataTypes.STRING,
    Note: DataTypes.DECIMAL
  }, {});
  Ramen.associate = function(models) {
    // associations can be defined here
  };
  return Ramen;
};