"use strict";
const { Model } = require("sequelize");
const MsAyuda = require("./MsAyuda");

module.exports = (sequelize, DataTypes) => {
  class MsAyudaMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // MsAyudaMenu.hasMany(models.Menu,{
      //    as:"menu",
      //    foreignKey:"id_menu"
      //  })

      // // hasOne associations
      // MsAyudaMenus.hasOne(models.OrderDetail, {
      //   as: 'orderdetails',
      //   foreignKey: 'products_id'
      // })

      // hasMany associations
      MsAyudaMenu.hasMany(models.MsAyuda,{
        as:"msayuda",
        foreignKey:"id"
      })

      // // belongsTo associations
      // Product.belongsTo(models.Category,{
      //   as:"categories",
      //   foreignKey: "categories_id"
      // })

    }
  }
  MsAyudaMenu.init(
    { id: {
         type: DataTypes.NUMERIC,
         allowNull: false,
         primaryKey: true },
      id_menu:DataTypes.NUMERIC
    },
    {
      sequelize,
      modelName: "MsAyudaMenu",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'ms_ayuda_menu_general'
    }
  );
  return MsAyudaMenu;
};


// id: {
//   type: DataTypes.NUMERIC,
//   allowNull: false,
//   primaryKey: true,
//   references: {
//     model: Model.MsAyuda, 
//     key: 'id'
//   }
// },
// id_menu:
// {  type: DataTypes.NUMERIC,
//   references: {
//     model: Model.Menu,
//     key: 'id'}    
//   }
// } 