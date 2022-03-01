import { all, call, put, takeLatest, fork } from "redux-saga/effects";
import { NEW_TRANSACTION_FAILURE, NEW_TRANSACTION_REQUEST, NEW_TRANSACTION_SUCCESS } from "../reducers/transaction";
import axios from 'axios';

function newTranactionAPI(data) {
  console.log(data);
  if (data.type === '입고') {
    return axios.post('/transaction/receiving', data);
  } else {
    return axios.post('/transaction/shipping', data);
  }
}
function* newTranaction(action) {
  try {
    const result = yield call(newTranactionAPI, action.data);
    yield put({
      type: NEW_TRANSACTION_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: NEW_TRANSACTION_FAILURE,
      data: err.resNEW_TRANSACTION_SUCCESSponse.data,
    })
  }
}

function* watchNewTranaction() {
  yield takeLatest(NEW_TRANSACTION_REQUEST, newTranaction);
}

export default function* transactionSaga() {
  yield all([
    fork(watchNewTranaction),
  ])
}