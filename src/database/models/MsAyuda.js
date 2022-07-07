"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MsAyuda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //MsAyuda.belongsToMany( models.Menu, { through: models.MsAyudaMenu });
      // // hasOne associations
      // MsAyudas.hasOne(models.OrderDetail, {
      //   as: 'orderdetails',
      //   foreignKey: 'products_id'
      // })

      // // hasMany associations
      // Product.hasMany(models.Image,{
      //   as:"images",
      //   foreignKey:"products_id"
      // })

      // belongsTo associations
      // MsAyuda.belongsTo(models.MsAyudaMenu,{
      //   as:"msayudamenu",
      //   foreignKey: "id_menu"
      // })

    }
  }
  MsAyuda.init(
    { tipo: DataTypes.STRING,
		denominacion: DataTypes.STRING,
		destalle: DataTypes.STRING,
		palabra_clave: DataTypes.STRING,
		fecha_actualizacion: DataTypes.DATE,
		etiquetas: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MsAyuda",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'ms_ayuda'
    }
  );
  return MsAyuda;
};