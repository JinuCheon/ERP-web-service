import produce from 'immer';

export const initialState = {
  displayNewCustomerModal: false,
  createNewCustomerLoading: false,
  createNewCustomerDone: false,
  deleteCustomerLoading: false,
  deleteCustomerDone: false,
  customer: [],
}

export const LOAD_CUSTOMER_REQUEST = 'LOAD_CUSTOMER_REQUEST';
export const LOAD_CUSTOMER_FAILURE = 'LOAD_CUSTOMER_FAILURE';
export const LOAD_CUSTOMER_SUCCESS = 'LOAD_CUSTOMER_SUCCESS';
export const SHOW_NEW_CUSTOMER_MODAL = 'SHOW_NEW_CUSTOMER_MODAL';
export const CLOSE_NEW_CUSTOMER_MODAL = 'CLOSE_NEW_CUSTOMER_MODAL';
export const CREATE_NEW_CUSTOMER_REQUEST = 'CREATE_NEW_CUSTOMER_REQUEST';
export const CREATE_NEW_CUSTOMER_FAILURE = 'CREATE_NEW_CUSTOMER_FAILURE';
export const CREATE_NEW_CUSTOMER_SUCCESS = 'CREATE_NEW_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';

export const createNewCustomerAction = (data) => ({
  type: CREATE_NEW_CUSTOMER_REQUEST,
  data,
});

export const showNewCustomerModal = () => ({
  type: SHOW_NEW_CUSTOMER_MODAL,
});

export const closeNewCustomerModal = () => ({
  type: CLOSE_NEW_CUSTOMER_MODAL,
});

export const deleteCustomerAction = (data) => ({
  type: DELETE_CUSTOMER_REQUEST,
  data,
});

const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CUSTOMER_REQUEST:
        draft.loadCustomerLoading = true;
        break;

      case LOAD_CUSTOMER_FAILURE:
        draft.loadCustomerLoading = false;
        break;

      case LOAD_CUSTOMER_SUCCESS:
        draft.loadCustomerLoading = false;
        draft.customer = action.data;
        break;
      
      case CREATE_NEW_CUSTOMER_REQUEST:
        draft.createNewCustomerLoading = true;
        draft.createNewCustomerDone = false;
        break;
      
      case CREATE_NEW_CUSTOMER_FAILURE:
        draft.createNewCustomerLoading = false;
        break;
      
      case CREATE_NEW_CUSTOMER_SUCCESS:
        draft.createNewCustomerLoading = false;
        draft.createNewCustomerDone = true;
        draft.displayNewCustomerModal = false;
        draft.customer.push(action.data);
        break;

      case DELETE_CUSTOMER_REQUEST:
        draft.deleteCustomerLoading = true;
        draft.deleteCustomerDone = false;
        break;
      
      case DELETE_CUSTOMER_FAILURE:
        draft.deleteCustomerLoading = false;
        break;
      
      case DELETE_CUSTOMER_SUCCESS:
        draft.deleteCustomerLoading = false;
        draft.deleteCustomerDone = true;
        draft.customer = draft.customer.filter((v) => !action.data.includes(v.id));
        break;

      case SHOW_NEW_CUSTOMER_MODAL:
        draft.displayNewCustomerModal = true;
        break;

      case CLOSE_NEW_CUSTOMER_MODAL:
        draft.displayNewCustomerModal = false;
        break;

      default:
        break;
    }
  })
}

export default rootReducer;
