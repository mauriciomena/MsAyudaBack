"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class MsAyudaArchivos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here   

    }
  }
  MsAyudaArchivos.init(
    { id_archivo:  DataTypes.NUMERIC,
		  id_ayuda:  DataTypes.NUMERIC,
    },
    {
      sequelize,
      modelName: "MsAyudaArchivos",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'ms_ayuda_archivos'
    }
  );
  return MsAyudaArchivos;
};