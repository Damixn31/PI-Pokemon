const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID, // para que no se pise el id
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hp: {
        type: DataTypes.STRING,
      },
      force: {
        type: DataTypes.INTEGER,
      },
      defending: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.TEXT,
      },
      createdByUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:true,
      },
    },
    { timestamps: false }
  );
};
