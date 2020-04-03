'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    desciption: DataTypes.TEXT,
    category_id: DataTypes.INTEGER
  }, {});
  Task.associate = function (models) {
    Task.belongsTo(models.Category, { foreignKey: 'category_id' });
  };
  return Task;
};