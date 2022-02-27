const express = require('express');
const { Customer } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    if(req.body.id === null) {
      await Customer.create({
        companyName: req.body.companyName,
        customerType: req.body.customerType,
      });
    } else {
      await Customer.create({
        companyName: req.body.companyName,
        customerType: req.body.customerType,
        id: req.body.id,
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
    const customers = await Customer.findAll();
    res.status(201).json(customers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:customerId', async (req, res, next) => {
  try {
    await Customer.destroy({
      where: {
        id: req.params.customerId,
      }
    })
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
