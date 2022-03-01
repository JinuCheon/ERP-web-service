import produce from 'immer';

export const initialState = {
  loadTransactionRedordLoading: false,
  transactionLoading: false,
  transactionColumns: [{
    name: '거래종류',
    selector: row => row.type,
    sortable: true,
  },{
    name: '제품코드',
    selector: row => row.ProductId,
    sortable: true,
  }, {
    name: '제품명',
    selector: row => row.Product.name,
    sortable: true,
  }, {
    name: '거래처코드',
    selector: row => row.CustomerId,
    sortable: true,
  }, {
    name: '거래처명',
    selector: row => row.Customer.companyName,
    sortable: true,
  }, {
    name: '날짜',
    selector: row => row.transaction_date,
    sortable: true,
  }, {
    name: '수량',
    selector: row => row.transaction_stock,
    sortable: true,
  }],
  transactionRecord: [],
}

export const NEW_TRANSACTION_REQUEST = 'NEW_TRANSACTION_REQUEST';
export const NEW_TRANSACTION_FAILURE = 'NEW_TRANSACTION_FAILURE';
export const NEW_TRANSACTION_SUCCESS = 'NEW_TRANSACTION_SUCCESS';
export const LOAD_TRANSACTION_RECORD_REQUEST = 'LOAD_TRANSACTION_RECORD_REQUEST';
export const LOAD_TRANSACTION_RECORD_FAILURE = 'LOAD_TRANSACTION_RECORD_FAILURE';
export const LOAD_TRANSACTION_RECORD_SUCCESS = 'LOAD_TRANSACTION_RECORD_SUCCESS';

export const newTranactionRequest = (data) => ({
  type: NEW_TRANSACTION_REQUEST,
  data,
});

const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_TRANSACTION_RECORD_REQUEST:
        draft.loadTransactionRedordLoading = true;
        break;

      case LOAD_TRANSACTION_RECORD_FAILURE:
        draft.loadTransactionRedordLoading = false;
        break;

      case LOAD_TRANSACTION_RECORD_SUCCESS:
        draft.loadTransactionRedordLoading = false;
        console.log(action.data);
        draft.transactionRecord = action.data;
        break;

      case NEW_TRANSACTION_REQUEST:
        draft.transactionLoading = true;
        break;

      case NEW_TRANSACTION_FAILURE:
        draft.transactionLoading = false;
        break;

      case NEW_TRANSACTION_SUCCESS:
        draft.transactionLoading = false;
        break;

      default:
        break;
    }
  })
}

export default rootReducer;
