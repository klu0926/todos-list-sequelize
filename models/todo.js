'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN
  }, {});
  // 設定 associate 可以讓model使用自動生產 關聯型的 method
  // 例如 Tod 現在可以使用 getUser() 找到對應的使用者
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};