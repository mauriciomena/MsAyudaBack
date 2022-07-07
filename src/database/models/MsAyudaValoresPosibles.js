"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MsAyudaValoresPosibles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //MsAyudaValoresPosibles.belongsToMany( models.Menu, { through: models.MsAyudaValoresPosiblesMenu });
      // // hasOne associations
      // MsAyudaValoresPosibless.hasOne(models.OrderDetail, {
      //   as: 'orderdetails',
      //   foreignKey: 'products_id'
      // })

      // // hasMany associations
      // Product.hasMany(models.Image,{
      //   as:"images",
      //   foreignKey:"products_id"
      // })

      // belongsTo associations
      // MsAyudaValoresPosibles.belongsTo(models.MsAyudaValoresPosiblesMenu,{
      //   as:"MsAyudaValoresPosiblesmenu",
      //   foreignKey: "id_menu"
      // })

    }
  }
  MsAyudaValoresPosibles.init(
    { id_ayuda: DataTypes.NUMERIC,
      valor: DataTypes.STRING,
		denominacion_valor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MsAyudaValoresPosibles",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'ms_ayuda_valores_posibles'
    }
  );
  return MsAyudaValoresPosibles;
};