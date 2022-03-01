import produce from 'immer';

export const initialState = {
  displayNewProductModal: false,
  loadProductLoading: false,
  createNewProductLoading: false,
  deleteProductLoading: false,
  productColumns: [{
    name: '제품코드',
    selector: row => row.id,
    sortable: true,
  }, {
    name: '제품명',
    selector: row => row.name,
    sortable: true,
  }, {
    name: '카테고리',
    selector: row => row.Category.name,
    sortable: true,
  }, {
    name: '가격',
    selector: row => row.price,
    sortable: true,
  }, {
    name: '재고',
    selector: row => row.stock,
    sortable: true,
  }],
  products: [],
  category: [
    {
      id: 100,
      name: '바지',
    }, {
      id: 101,
      name: '상의',
    }, {
      id: 102,
      name: '신발',
    },
  ],
}

export const SHOW_NEW_PRODUCT_MODAL = 'SHOW_NEW_PRODUCT_MODAL';
export const CLOSE_NEW_PRODUCT_MODAL = 'CLOSE_NEW_PRODUCT_MODAL';
export const LOAD_PRODUCT_REQUEST = 'LOAD_PRODUCT_REQUEST';
export const LOAD_PRODUCT_FAILURE = 'LOAD_PRODUCT_FAILURE';
export const LOAD_PRODUCT_SUCCESS = 'LOAD_PRODUCT_SUCCESS';
export const CREATE_NEW_PRODUCT_REQUEST = 'CREATE_NEW_PRODUCT_REQUEST';
export const CREATE_NEW_PRODUCT_FAILURE = 'CREATE_NEW_PRODUCT_FAILURE';
export const CREATE_NEW_PRODUCT_SUCCESS = 'CREATE_NEW_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const showNewProductModal = () => ({
  type: SHOW_NEW_PRODUCT_MODAL,
});
export const closeNewProductModal = () => ({
  type: CLOSE_NEW_PRODUCT_MODAL,
});

export const createNewProductRequest = (data) => ({
  type: CREATE_NEW_PRODUCT_REQUEST,
  data,
});

export const deleteProductRequest = (data) => ({
  type: DELETE_PRODUCT_REQUEST,
  data,
});

const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SHOW_NEW_PRODUCT_MODAL:
        draft.displayNewProductModal = true;
        break;

      case CLOSE_NEW_PRODUCT_MODAL:
        draft.displayNewProductModal = false;
        break;
      
      case LOAD_PRODUCT_REQUEST:
        draft.loadProductLoading = true;
        break;
      
      case LOAD_PRODUCT_FAILURE:
        draft.loadProductLoading = false;
        break;
      
      case LOAD_PRODUCT_SUCCESS:
        draft.loadProductLoading = false;
        draft.products = action.data;
        break;

      case CREATE_NEW_PRODUCT_REQUEST:
        draft.createNewProductLoading = true;
        break;
      
      case CREATE_NEW_PRODUCT_FAILURE:
        draft.createNewProductLoading = false;
        break;
      
      case CREATE_NEW_PRODUCT_SUCCESS:
        draft.createNewProductLoading = false;
        draft.displayNewProductModal = false;
        break;

      case DELETE_PRODUCT_REQUEST:
        draft.deleteProductLoading = true;
        break;
      
      case DELETE_PRODUCT_FAILURE:
        draft.deleteProductLoading = false;
        break;
      
      case DELETE_PRODUCT_SUCCESS:
        draft.deleteProductLoading = false;
        break;

      default:
        break;
    }
  })
}

export default rootReducer;
