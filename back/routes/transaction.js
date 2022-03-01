const express = require('express');
const { Product, Category, Transaction } = require('../models');

const router = express.Router();

router.post('/receiving', async (req, res, next) => {
  try {
    await Transaction.create({
      type: req.body.type,
      productId: req.body.productId,
      price: req.body.price,
      CustomerId: req.body.customerId,
      transaction_date: req.body.transactionDate,
      transaction_stock: req.body.transactionStock,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/shipping', async (req, res, next) => {
  try {
    console.log(req.body);
    const stock = await Product.findAll({
      where: {
        id: req.body.productId,
      },
      attributes: ['stock'],
    });

    console.log("here is stock: ");
    console.log(stock);

    await Transaction.create({
      productId: req.body.productId,
      type: req.body.type,
      price: req.body.price,
      datetime: datetime,
    });
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
