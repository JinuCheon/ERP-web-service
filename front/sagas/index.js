import { all, fork } from 'redux-saga/effects';
import productSaga from './product';
import transactionSaga from './transaction';

export default function* rootSaga() {
  yield all([
    fork(productSaga),
    fork(transactionSaga),
  ]);
}
