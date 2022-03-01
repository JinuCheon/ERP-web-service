module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    type : {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    transaction_date : {
      type: DataTypes.DATE,
      allowNull: false,
    },
    transaction_stock : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Transaction.associate = (db) => {
    db.Transaction.belongsTo(db.Customer, { through: 'transactionCustomerMapping'});
    db.Transaction.belongsTo(db.Product, { through: 'transactionProductMapping'});
  };
  return Transaction;
}
