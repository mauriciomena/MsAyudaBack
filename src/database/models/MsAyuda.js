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

      // hasMany associations
      MsAyuda.hasMany(models.MsAyudaValoresPosibles,{
        as:"valoresPosibles",
        foreignKey:"id_ayuda"
      })

      MsAyuda.belongsToMany(models.Archivos,{
        as: "archivos",
        through: "ms_ayuda_archivos",
        foreignKey:"id_ayuda",
        otherKey:"id_archivo",
        timestamps:"false"
      })

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