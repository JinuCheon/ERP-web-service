import { all, delay, put, takeLatest, fork } from "redux-saga/effects";
import { CREATE_NEW_CUSTOMER_FAILURE, CREATE_NEW_CUSTOMER_REQUEST, CREATE_NEW_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS } from "../reducers/customer";

function* createNewCustomer(action) {
  console.log(action);
  try {
    yield delay(1000);
    yield put({
      type: CREATE_NEW_CUSTOMER_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_NEW_CUSTOMER_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchCreateNewCustomer() {
  yield takeLatest(CREATE_NEW_CUSTOMER_REQUEST, createNewCustomer);
}

function* deleteCustomer(action) {
  try {
    yield delay(1000);
    yield put({
      type: DELETE_CUSTOMER_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_CUSTOMER_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchDeleteCustomer() {
  yield takeLatest(DELETE_CUSTOMER_REQUEST, deleteCustomer);
}

export default function* customerSaga() {
  yield all([
    fork(watchCreateNewCustomer),
    fork(watchDeleteCustomer),
  ])
}