"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Menu.belongsToMany( models.MsAyuda, { through: models.MsAyudaMenu });
      // // hasOne associations
      // Menus.hasOne(models.OrderDetail, {
      //   as: 'orderdetails',
      //   foreignKey: 'products_id'
      // })

      // // hasMany associations
      // Product.hasMany(models.Image,{
      //   as:"images",
      //   foreignKey:"products_id"
      // })

      // // belongsTo associations
      // Product.belongsTo(models.Category,{
      //   as:"categories",
      //   foreignKey: "categories_id"
      // })

      

    }
  }
  Menu.init(
    { id_aplicacion: DataTypes.BIGINT,
		opcion: DataTypes.STRING,
		opcion_madre: DataTypes.STRING,
		sistema: DataTypes.BIGINT,
		nivel: DataTypes.BIGINT,
		orden: DataTypes.BIGINT,
		descripcion: DataTypes.STRING,
		nombre_objeto: DataTypes.STRING,
		ejecucion: DataTypes.STRING,
		acceso_rapido: DataTypes.STRING,
		observaciones: DataTypes.STRING,
		visible: DataTypes.STRING,
    descripcion_completa: DataTypes.STRING,
    proceso: DataTypes.STRING,
    descripcion_traducida: DataTypes.STRING,
    barra_herramientas: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menu",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'ms_menu_general'
    }
  );
  return Menu;
};