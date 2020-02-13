import React, { useEffect } from "react";
import { usePost } from "../../rest";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlQ3hftLRU439yRB4LB9uuYAKLvosKD9k";
const Login = () => {
  const [postData, signin] = usePost(url);

  useEffect(() => {
    if(Object.keys(postData.data).length > 0)
      alert('logou');
  }, [postData]);
  const login = async () => {
    await signin({
      email: "frauches@teste.com",
      password: "abc123",
      returnSecureToken: true
    });
  };
  return (
    <>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
      <pre>{JSON.stringify(postData)}</pre>
    </>
  );
};

export default Login;
