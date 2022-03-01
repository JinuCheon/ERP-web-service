const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const transactionRouter = require('./routes/transaction');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
}));

db.sequelize.sync()
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch(console.error);

app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/transaction', transactionRouter);

app.listen(3065, () => {
  console.log('서버설정중');
});
