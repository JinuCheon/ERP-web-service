import { all, delay, put, takeLatest, fork } from "redux-saga/effects";
import { CREATE_NEW_PRODUCT_FAILURE, CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS } from "../reducers/product";

function* createNewProduct(action) {
  try {
    yield delay(1000);
    yield put({
      type: CREATE_NEW_PRODUCT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_NEW_PRODUCT_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchCreateNewProduct() {
  yield takeLatest(CREATE_NEW_PRODUCT_REQUEST, createNewProduct);
}

function* deleteProduct(action) {
  try {
    yield delay(1000);
    yield put({
      type: DELETE_PRODUCT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_PRODUCT_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchDeleteProduct() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProduct);
}

export default function* productSaga() {
  yield all([
    fork(watchCreateNewProduct),
    fork(watchDeleteProduct),
  ])
}