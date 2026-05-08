const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db-connect");

const SubscriptionRequest = sequelize.define(
  "SubscriptionRequest",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    transactionId: { type: DataTypes.STRING, allowNull: false, unique: true },
    planName: { type: DataTypes.STRING, allowNull: false },

    status: { 
      type: DataTypes.ENUM('pending', 'approved', 'rejected'), 
      defaultValue: 'pending' 
    },
    paymentMethod: { 
        type: DataTypes.STRING,
        allowNull: true
      },
  },
  {
    tableName: "SubscriptionRequests",
    timestamps: true,
  }
);

module.exports = { SubscriptionRequest };