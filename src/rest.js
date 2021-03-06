import Axios from "axios";
import { useEffect, useReducer } from "react";

Axios.defaults.validateStatus = code => code < 500;

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: "",
  status: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loading: true
      };

    case "SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case "FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status
      };

    default:
      return state;
  }
};

const init = baseUrl => {
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const carregar = async () => {
      dispatch({ type: "REQUEST" });
      try {
        const res = await Axios.get(baseUrl + resource + ".json");
        if (res.data.error && Object.keys(res.data.error).length > 0) {
          dispatch({ type: "FAILURE", payload: res.data.error, status: res.status });
        } else {
          dispatch({ type: "SUCCESS", payload: res.data });
        }
      } catch (error) {
        dispatch({ type: "FAILURE", payload: "error loading data" });
      }
    };

    useEffect(() => {
      carregar();
    }, [resource]);

    return { ...data, refetch: carregar };
  };

  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const post = async data => {
      dispatch({ type: "REQUEST" });
      const res = await Axios.post(baseUrl + resource + ".json", data);
      dispatch({ type: "SUCCESS", payload: res.data });
    };

    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const remove = async resource => {
      dispatch({ type: "REQUEST" });
      await Axios.delete(baseUrl + resource + ".json", data);
      dispatch({ type: "SUCCESS" });
    };

    return [data, remove];
  };
  return { useGet, usePost, useDelete };
};

export default init;

export const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
  const post = async data => {
    dispatch({ type: "REQUEST" });
    try {
      const res = await Axios.post(resource, data);
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({ type: "FAILURE", payload: res.data.error.message });
      } else {
        dispatch({ type: "SUCCESS", payload: res.data });
      }
      return res.data;
    } catch (error) {
      console.log(JSON.stringify(error));
      dispatch({ type: "FAILURE", payload: "SIGIN ERROR" });
    }
  };

  return [data, post];
};
