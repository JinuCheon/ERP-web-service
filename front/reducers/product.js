import produce from 'immer';

export const initialState = {
    products: [{
        code: 1,
        name: "생수",
        price: 1000,
    }],
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
