const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db-connect"); 

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "User",
    timestamps: true,
  }
);

module.exports = { User };