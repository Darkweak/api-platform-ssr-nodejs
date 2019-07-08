import * as actions from './action';

export const BookReducer = (state = {
  books: []
}, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.BOOKS_LIST_FAILED:
      return {
        ...state,
        books: []
      };
    case actions.BOOKS_LIST_SUCCESS:
      return {
        ...state,
        books: payload
      };
    default:
      return state;
  }
};
