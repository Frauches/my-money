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
    const carregar = async () => {
      dispatch({ type: 'REQUEST' });
      const res = await Axios.get(baseUrl + resource + '.json')
      dispatch({ type: 'SUCCESS', payload: res.data });
    }

    useEffect(() => {
      carregar();
    }, [resource])

    return { ...data, refetch: carregar };
  }

  const usePost = resource => {

    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const post = async data => {
      dispatch({ type: 'REQUEST' });
      const res = await Axios.post(baseUrl + resource + '.json', data);
      dispatch({ type: 'SUCCESS', payload: res.data });
    }

    return [data, post];
  }

  const useDelete = () => {

    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const remove = async resource => {
      dispatch({ type: 'REQUEST' });
      await Axios.delete(baseUrl + resource + '.json', data)
      dispatch({ type: 'SUCCESS' })
    }

    return [data, remove];
  }
  return { useGet, usePost, useDelete };
}

export default init;