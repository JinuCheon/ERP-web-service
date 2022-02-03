import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import product from './product';

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
});

export default rootReducer;