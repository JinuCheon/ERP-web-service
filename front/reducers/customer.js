import produce from 'immer';

export const initialState = {
  createNewCustomerLoading: false,
  deleteCustomerLoading: false,
  customer: [
    {
      id: 1,
      companyName: 'A사',
      type: '판매',
      tradingVolume: '123',
    }, {
      id: 2,
      companyName: 'B사',
      type: '구매',
      tradingVolume: '123',
    }, {
      id: 3,
      companyName: 'C사',
      type: '판매',
      tradingVolume: '123',
    }, {
      id: 4,
      companyName: 'D사',
      type: '구매',
      tradingVolume: '123',
    }, {
      id: 5,
      companyName: 'E사',
      type: '구매',
      tradingVolume: '123',
    }
  ]
}

export const CREATE_NEW_CUSTOMER_REQUEST = 'CREATE_NEW_CUSTOMER_REQUEST';
export const CREATE_NEW_CUSTOMER_FAILURE = 'CREATE_NEW_CUSTOMER_FAILURE';
export const CREATE_NEW_CUSTOMER_SUCCESS = 'CREATE_NEW_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';

export const createNewCustomerRequest = (data) => ({
  type: CREATE_NEW_CUSTOMER_REQUEST,
  data,
});

const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CREATE_NEW_CUSTOMER_REQUEST:
        draft.createNewCustomerLoading = true;
        break;
      
      case CREATE_NEW_CUSTOMER_FAILURE:
        draft.createNewCustomerLoading = false;
        break;
      
      case CREATE_NEW_CUSTOMER_SUCCESS:
        draft.createNewCustomerLoading = false;
        draft.products = draft.products.filter((v) => !action.data.includes(v.code));
        break;

      case CREATE_NEW_CUSTOMER_REQUEST:
        draft.deleteCustomerLoading = true;
        break;
      
      case CREATE_NEW_CUSTOMER_FAILURE:
        draft.deleteCustomerLoading = false;
        break;
      
      case CREATE_NEW_CUSTOMER_SUCCESS:
        draft.deleteCustomerLoading = false;
        draft.products = draft.products.filter((v) => !action.data.includes(v.code));
        break;

      default:
        break;
    }
  })
}

export default rootReducer;
