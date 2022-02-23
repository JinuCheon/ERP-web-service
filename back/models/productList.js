module.exports = (sequelize, DataTypes) => {
  const ProductList = sequelize.define('ProductList', {
    product_name : {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  ProductList.associate = (db) => {};
  return ProductList;
}
