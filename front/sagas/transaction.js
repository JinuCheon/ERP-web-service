import { all, delay, put, takeLatest, fork } from "redux-saga/effects";
import { NEW_TRANSACTION_FAILURE, NEW_TRANSACTION_REQUEST, NEW_TRANSACTION_SUCCESS } from "../reducers/transaction";

function* newTranactionRequest(action) {
  try {
    yield delay(1000);
    yield put({
      type: NEW_TRANSACTION_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: NEW_TRANSACTION_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchNewTranaction() {
  yield takeLatest(NEW_TRANSACTION_REQUEST, newTranactionRequest);
}

export default function* transactionSaga() {
  yield all([
    fork(watchNewTranaction),
  ])
}