"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Archivos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Archivos.belongsToMany(models.MsAyuda,{
        as: "msayuda",
        through: "ms_ayuda_archivos",
        foreignKey:"id_archivo",
        otherKey:"id_ayuda",
        timestamps:"false"
      })

    }
  }
  Archivos.init(
    { nombre: DataTypes.STRING,
		extension: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Archivos",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'archivos'
    }
  );
  return Archivos;
};