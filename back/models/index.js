const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Product = require('./product')(sequelize, Sequelize);
db.ProductList = require('./productList')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Customer = require('./customer')(sequelize, Sequelize);
db.Transaction = require('./transaction')(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
  // 여기에서 반복문 돌면서 db관계를 다 등록해준다.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
