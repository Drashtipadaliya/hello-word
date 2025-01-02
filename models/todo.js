/* eslint-disable no-undef */
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "todos",
    {
      // Change "Todo" to "todos"
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set the current date
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set the current date
      },
    },
    {
      tableName: "todos", // Ensure the table name is specified in lowercase
      timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
  );

  // If you have any associations, define them here
  Todo.associate = (models) => {
    // Example: Todo.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Todo;
};
