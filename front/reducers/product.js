import produce from 'immer';

export const initialState = {
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
    },
  ],
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
    }, 
  ],
  category: [
    '바지',
    '상의',
    '신발',
  ],
}

export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT';

const rootReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case CREATE_NEW_PRODUCT:
                draft.products.shift(action.data);
                break;
            default:
                break;
        }
    })
}

export default rootReducer;
