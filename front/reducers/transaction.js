import produce from 'immer';

export const initialState = {
  transactionLoading: false,
  transactionColumns: [{
    name: '거래종류',
    selector: row => row.type,
    sortable: true,
  },{
    name: '제품코드',
    selector: row => row.productId,
    sortable: true,
  }, {
    name: '거래처',
    selector: row => row.venderName,
    sortable: true,
  }, {
    name: '카테고리',
    selector: row => row.productCategory,
    sortable: true,
  }, {
    name: '수량',
    selector: row => row.productStock,
    sortable: true,
  }],
  transactionData: [{
    type: '출고',
    productId: '0001',
    productCategory: '바지',
    venderName: '야놀자',
    productStock: 3,
  },{
    type: '입고',
    productId: '0005',
    productCategory: '신발',
    venderName: '배달의민족',
    productStock: 3,
  },{
    type: '출고',
    productId: '0003',
    productCategory: '상의',
    venderName: '토스',
    productStock: 3,
  },{
    type: '입고',
    productId: '0002',
    productCategory: '상의',
    venderName: '네이버',
    productStock: 3,
  },{
    type: '입고',
    productId: '0006',
    productCategory: '바지',
    venderName: '카카오',
    productStock: 3,
  }],
}

export const NEW_TRANSACTION_REQUEST = 'NEW_TRANSACTION_REQUEST';
export const NEW_TRANSACTION_FAILURE = 'NEW_TRANSACTION_FAILURE';
export const NEW_TRANSACTION_SUCCESS = 'NEW_TRANSACTION_SUCCESS';

export const newTranactionRequest = (data) => ({
  type: NEW_TRANSACTION_REQUEST,
  data,
});

const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case NEW_TRANSACTION_REQUEST:
        draft.transactionLoading = true;
        break;

      case NEW_TRANSACTION_FAILURE:
        draft.transactionLoading = false;
        break;

      case NEW_TRANSACTION_SUCCESS:
        draft.transactionLoading = false;
        draft.transactionData.push(action.data);
        break;

      default:
        break;
    }
  })
}

export default rootReducer;
