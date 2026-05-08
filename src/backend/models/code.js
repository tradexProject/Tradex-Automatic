const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db-connect");

const Code = sequelize.define(
  "Code",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    planName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    activationCode: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    isUsed: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
        usedBy: {
  type: DataTypes.STRING,
  allowNull: true
},
    usedAt: { 
      type: DataTypes.DATE, 
      allowNull: true 
    }
  },
  {
    tableName: "Codes",
    timestamps: true,
  }
);

module.exports = { Code };