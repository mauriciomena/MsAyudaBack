"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vw_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Vw_menu.belongsToMany( models.MsAyuda, { through: models.MsAyudaVw_menu });
      // // hasOne associations
      // Vw_menus.hasOne(models.OrderDetail, {
      //   as: 'orderdetails',
      //   foreignKey: 'products_id'
      // })

      // // hasMany associations
      // Product.hasMany(models.Image,{
      //   as:"images",
      //   foreignKey:"products_id"
      // })

      // belongsTo associations
      Vw_menu.hasMany(models.MsAyudaMenu,{
        as:"msayudamenu",
        foreignKey: "id_menu"
      })

      

    }
  }
  Vw_menu.init(
    {descripcion: DataTypes.STRING,
      opcion_madre: DataTypes.STRING,
      nivel: DataTypes.BIGINT,
		opcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vw_menu",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'Vw_menu'
    }
  );
  return Vw_menu;
};