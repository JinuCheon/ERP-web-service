module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    type : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    name : {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    date : {
      type: DataTypes.DATE,
      allowNull: false,
    },
    proudct_id : {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    product_category : {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    vender_name : {
      type: DataTypes.STRING(30),
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
  Transaction.associate = (db) => {};
  return Transaction;
}
