'use strict';
const bcrypt = require('bcryptjs')
const SEEDER_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '111'
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: SEEDER_USER.name,
      email: SEEDER_USER.email,
      password: bcrypt.hashSync(SEEDER_USER.password, bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})

      // bulkInsert 回傳一個 promise 裡面有剛創立的record的資料轉換成 plain object
      // 例如：[{id: 1, name: 'root', email: '...' }]
      // 因為 Todo 有設定 associate 跟 UserId 設定成 FK reference { model: User' ,key: 'id' }
      // 所以這邊 當我們使用 UserId: user 的時候會自動先確認是否是 User model, 然後找裡面叫做 ‘id’ 的東西

      .then(user => queryInterface.bulkInsert('Todos',
        Array.from({ length: 10 }).map((_, index) =>
        ({
          name: `todo-${index}`,
          UserId: user,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        ), {}))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  }
};
