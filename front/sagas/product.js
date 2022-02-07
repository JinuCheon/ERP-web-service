import { all, delay, put, takeLatest, fork } from "redux-saga/effects";
import { CREATE_NEW_PRODUCT_FAILURE, CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS } from "../reducers/product";

function* createNewProduct(action) {
  console.log("hi");
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

export default function* productSaga() {
  yield all([
    fork(watchCreateNewProduct),
  ])
}