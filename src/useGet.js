import { useEffect, useReducer } from 'react';
import Axios from 'axios';

const reducer = (state, action) => {

  switch (action.type) {

    case 'REQUEST':
      return {
        ...state,
        loading: true
      }

    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload
      }

    default:
      return state;
  }
}

export const useGet = url => {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  });

  useEffect(() => {
    dispatch({ type: 'REQUEST' });
    Axios.get(url)
      .then(res => {
        dispatch({ type: 'SUCCESS', payload: res.data });
      })
  }, [url])

  return data;
}