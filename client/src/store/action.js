import axios from 'axios';

export const BOOKS_LIST_FAILED = 'BOOKS_LIST_FAILED';
export const BOOKS_LIST_SUCCESS = 'BOOKS_LIST_SUCCESS';

export const fetchBooks = () => async (dispatch) => {
  try {
    let headers = {
      Accept: 'application/ld+json',
      'Content-Type': 'application/ld+json'
    };
    const request = ({
      url: `${ process.env.REACT_APP_API_ENTRYPOINT }/books`,
      method: 'GET',
      headers
    });
    const res = await axios.request(request);
    dispatch({
      type: BOOKS_LIST_SUCCESS,
      payload: res.data[ 'hydra:member' ]
    });
  } catch (e) {
    dispatch({
      type: BOOKS_LIST_FAILED
    });
  }
};
