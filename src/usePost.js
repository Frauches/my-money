import { useReducer } from 'react';
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

export const usePost = url => {

  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })

  const post = data => {
    dispatch({ type: 'REQUEST' });
    Axios
      .post(url, data)
      .then(res => {
        dispatch({ type: 'SUCCESS', payload: res.data })
      })
  }

  return [data, post];
}