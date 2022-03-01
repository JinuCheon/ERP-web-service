import { all, call, put, takeLatest, fork } from "redux-saga/effects";
import { LOAD_TRANSACTION_RECORD_FAILURE, LOAD_TRANSACTION_RECORD_REQUEST, LOAD_TRANSACTION_RECORD_SUCCESS, NEW_TRANSACTION_FAILURE, NEW_TRANSACTION_REQUEST, NEW_TRANSACTION_SUCCESS } from "../reducers/transaction";
import axios from 'axios';

function loadTranactionRecordAPI() {
  return axios.get('/transaction');
}
function* loadTranactionRecord(action) {
  try {
    const result = yield call(loadTranactionRecordAPI, action.data);
    yield put({
      type: LOAD_TRANSACTION_RECORD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_TRANSACTION_RECORD_FAILURE,
      data: err.response.data,
    })
  }
}

function newTranactionAPI(data) {
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
    });
  } catch (err) {
    yield put({
      type: NEW_TRANSACTION_FAILURE,
      data: err.resNEW_TRANSACTION_SUCCESSponse.data,
    })
  }
}

function* watchloadTransactionRedord() {
  yield takeLatest(LOAD_TRANSACTION_RECORD_REQUEST, loadTranactionRecord);
}
function* watchNewTranaction() {
  yield takeLatest(NEW_TRANSACTION_REQUEST, newTranaction);
}

export default function* transactionSaga() {
  yield all([
    fork(watchNewTranaction),
    fork(watchloadTransactionRedord),
  ])
}
