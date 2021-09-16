import produce from 'immer';

export const initialState = {
  displayNewProductModal: false,
  createNewProductLoading: false,
  deleteProductLoading: false,
  productColumns: [{
    name: '제품코드',
    selector: row => row.code,
    sortable: true,
  }, {
    name: '제품명',
    selector: row => row.name,
    sortable: true,
  }, {
    name: '카테고리',
    selector: row => row.category,
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
  products: [{
    code: '0001',
    name: '청바지',
    category: '바지',
    price: 1000,
    stock: 52,
  }, {
    code: '0002',
    name: '슬렉스',
    category: '바지',
    price: 1500,
    stock: 142,
  }, {
    code: '0003',
    name: '흰색무지티',
    category: '상의',
    price: 5000,
    stock: 12,
  }, {
    code: '0004',
    name: '핑크무지티',
    category: '상의',
    price: 2000,
    stock: 142,
  }, {
    code: '0005',
    name: '독일군 스니커즈',
    category: '신발',
    price: 66000,
    stock: 12,
  }],
  category: [
    '바지',
    '상의',
    '신발',
  ],
}

export const SHOW_NEW_PRODUCT_MODAL = 'SHOW_NEW_PRODUCT_MODAL';
export const CLOSE_NEW_PRODUCT_MODAL = 'CLOSE_NEW_PRODUCT_MODAL';
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
      
      case CREATE_NEW_PRODUCT_REQUEST:
        draft.createNewProductLoading = true;
        break;
      
      case CREATE_NEW_PRODUCT_FAILURE:
        draft.createNewProductLoading = false;
        break;
      
      case CREATE_NEW_PRODUCT_SUCCESS:
        draft.createNewProductLoading = false;
        draft.products.push(action.data);
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
        draft.products = draft.products.filter((v) => !action.data.includes(v.code));
        break;

      default:
        break;
    }
  })
}

export default rootReducer;
