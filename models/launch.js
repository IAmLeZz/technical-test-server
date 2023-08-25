'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Launch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Launch.init({
    year: DataTypes.INTEGER,
    launches: DataTypes.INTEGER,
    successful_launches: DataTypes.INTEGER,
    failed_launches: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Launch',
  });
  return Launch;
};