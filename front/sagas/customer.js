import axios from 'axios';
import { all, delay, put, takeLatest, fork, call } from "redux-saga/effects";
import { CREATE_NEW_CUSTOMER_FAILURE, CREATE_NEW_CUSTOMER_REQUEST, CREATE_NEW_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, LOAD_CUSTOMER_FAILURE, LOAD_CUSTOMER_REQUEST, LOAD_CUSTOMER_SUCCESS } from "../reducers/customer";

function loadCustomerAPI() {
  return axios.get('/customer');
}
function* loadCustomer(action) {
  try {
    const result = yield call(loadCustomerAPI);
    yield put({
      type: LOAD_CUSTOMER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CUSTOMER_FAILURE,
      data: err.response.data,
    })
  }
}

function createNewCustomerAPI(data) {
  console.log(data);
  return axios.post('/customer', data);
}
function* createNewCustomer(action) {
  try {
    const result = yield call(createNewCustomerAPI, action.data);
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

function deleteCustomerAPI(data) {
  return axios.delete(`/customer/${data}`);
}
function* deleteCustomer(action) {
  try {
    const result = yield call(deleteCustomerAPI, action.data);
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

function* watchCreateNewCustomer() {
  yield takeLatest(CREATE_NEW_CUSTOMER_REQUEST, createNewCustomer);
}

function* watchDeleteCustomer() {
  yield takeLatest(DELETE_CUSTOMER_REQUEST, deleteCustomer);
}

function* watchloadCustomer() {
  yield takeLatest(LOAD_CUSTOMER_REQUEST, loadCustomer);
}

export default function* customerSaga() {
  yield all([
    fork(watchCreateNewCustomer),
    fork(watchDeleteCustomer),
    fork(watchloadCustomer),
  ]);
}
