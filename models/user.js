'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  // 設定 associate 可以讓model使用自動生產 關聯型的 method
  // 例如 User 現在可以使用 getTodos() 找到全部這名使用者的 todo
  User.associate = function (models) {
    User.hasMany(models.Todo)
  };
  return User;
};