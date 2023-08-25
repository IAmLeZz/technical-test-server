'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payload.init({
    type_of_payload: DataTypes.STRING,
    times_launched: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payload',
  });
  return Payload;
};