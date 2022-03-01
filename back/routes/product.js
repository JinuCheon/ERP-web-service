const express = require('express');
const { Product, Category } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    if(req.body.id === null) {
      await Product.create({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        CategoryId: req.body.categoryId,
      });
    } else {
      await Product.create({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        CategoryId: req.body.categoryId,
      });
    }
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const customers = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['id', 'name'],
      }]
    });
    res.status(201).json(customers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    console.log(req.body);
    await Product.destroy({
      where: {
        id: req.body.productId,
      }
    })
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
