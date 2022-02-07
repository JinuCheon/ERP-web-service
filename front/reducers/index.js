import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import product from './product';
import transaction from './transaction';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload,
        }
      default:
        return{
          ...state,
        }
    }
  },
  product,
  transaction,
});

export default rootReducer;