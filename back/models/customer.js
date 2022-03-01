module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    companyName : {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    customerType : {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Customer.associate = (db) => {
    db.Customer.belongsToMany(db.Transaction, { through: 'transactionCustomerMapping'})
  };
  return Customer;
}
