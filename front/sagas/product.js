import axios from "axios";
import { all, delay, put, takeLatest, fork, call } from "redux-saga/effects";
import { CREATE_NEW_PRODUCT_FAILURE, CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, LOAD_PRODUCT_FAILURE, LOAD_PRODUCT_REQUEST, LOAD_PRODUCT_SUCCESS } from "../reducers/product";

function loadProductAPI() {
  return axios.get('/product');
}
function* loadProduct() {
  try {
    const result = yield call(loadProductAPI);
    yield put({
      type: LOAD_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_PRODUCT_FAILURE,
      data: err.response.data,
    })
  }
}

function createNewProductAPI(data) {
  return axios.post('/product', data);
}
function* createNewProduct(action) {
  try {
    const result = yield call(createNewProductAPI, action.data);
    yield put({
      type: CREATE_NEW_PRODUCT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CREATE_NEW_PRODUCT_FAILURE,
      data: err.response.data,
    })
  }
}


function deleteNewProductAPI(data) {
  return axios.delete('/product', { data: { productId: data } });
}
function* deleteProduct(action) {
  try {
    const result = yield call(deleteNewProductAPI, action.data);
    yield put({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: DELETE_PRODUCT_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchLoadProduct() {
  yield takeLatest(LOAD_PRODUCT_REQUEST, loadProduct);
}
function* watchCreateNewProduct() {
  yield takeLatest(CREATE_NEW_PRODUCT_REQUEST, createNewProduct);
}
function* watchDeleteProduct() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProduct);
}

export default function* productSaga() {
  yield all([
    fork(watchLoadProduct),
    fork(watchCreateNewProduct),
    fork(watchDeleteProduct),
  ])
}