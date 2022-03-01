const express = require('express');
const { Product, Category, Transaction } = require('../models');

const router = express.Router();

router.post('/receiving', async (req, res, next) => {
  try {
    await Transaction.create({
      type: req.body.type,
      ProductId: req.body.productId,
      price: req.body.price,
      CustomerId: req.body.customerId,
      transaction_date: req.body.transactionDate,
      transaction_stock: req.body.transactionStock,
    });
    await Product.increment('stock', {
      by: req.body.transactionStock,
      where: { id: req.body.productId }
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/shipping', async (req, res, next) => {
  try {
    const findStockResult = await Product.findAll({
      where: {
        id: req.body.productId,
      },
      attributes: ['stock'],
    });

    if (findStockResult[0].dataValues.stock > req.body.transactionStock) {
      await Transaction.create({
        type: req.body.type,
        productId: req.body.productId,
        price: req.body.price,
        CustomerId: req.body.customerId,
        transaction_date: req.body.transactionDate,
        transaction_stock: req.body.transactionStock,
      });
      await Product.decrement('stock', {
        by: req.body.transactionStock,
        where: { id: req.body.productId }
      });
    } else {
      return res.status(403).send('재고 부족.');
    }
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const customers = await Transaction.findAll();
    res.status(201).json(customers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
