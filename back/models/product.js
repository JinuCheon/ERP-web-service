module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name : {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(30),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER(30),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Product.associate = (db) => {
    db.Product.belongsTo(db.Category);
    db.Product.belongsTo(db.ProductList);
  };
  return Product;
}
