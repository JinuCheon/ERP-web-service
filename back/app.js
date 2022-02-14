const express = requrie('express');
const cors = require('cors');
const db = require('./models');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
  origin: '*',
  credentials: false,
}));

db.sequelize.sync()
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch(console.error);

app.listen(3065, () => {
  console.log('서버설정중');
})