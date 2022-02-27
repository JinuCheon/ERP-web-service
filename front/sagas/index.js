import { all, fork } from 'redux-saga/effects';
import productSaga from './product';
import transactionSaga from './transaction';
import customerSaga from './customer';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(productSaga),
    fork(transactionSaga),
    fork(customerSaga),
  ]);
}
