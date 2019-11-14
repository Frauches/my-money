import { useReducer, useEffect } from 'react';
import Axios from 'axios';


const INITIAL_STATE = {
  loading: false,
  data: {}
};

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

const init = baseUrl => {
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
      dispatch({ type: 'REQUEST' });
      Axios.get(baseUrl + resource + '.json')
        .then(res => {
          dispatch({ type: 'SUCCESS', payload: res.data });
        })
    }, [resource])

    return data;
  }

  const usePost = resource => {

    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const post = data => {
      dispatch({ type: 'REQUEST' });
      Axios
        .post(baseUrl + resource + '.json', data)
        .then(res => {
          dispatch({ type: 'SUCCESS', payload: res.data })
        })
    }

    return [data, post];
  }

  const useDelete = () => {

    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const remove = resource => {
      dispatch({ type: 'REQUEST' });
      Axios
        .delete(baseUrl + resource + '.json', data)
        .then(() => {
          dispatch({ type: 'SUCCESS' })
        })
    }

    return [data, remove];
  }
  return { useGet, usePost, useDelete };
}

export default init;