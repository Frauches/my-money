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

export const useDelete = () => {

  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })

  const remove = url => {
    dispatch({ type: 'REQUEST' });
    Axios
      .delete(url, data)
      .then(() => {
        dispatch({ type: 'SUCCESS' })
      })
  }

  return [data, remove];
}