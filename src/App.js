import React from 'react';
import Rest from './rest';

const baseUrl = "https://mymoney-3ea9b.firebaseio.com";

function App() {

  const { useGet, usePost, useDelete } = Rest(baseUrl);
  const data = useGet("/movimentacoes/2019-10");
  const [postData, post] = usePost("/movimentacoes/2019-10");
  const [deleteData, remove] = useDelete();

  const saveData = () => {
    post({ valor: 7, descricao: 'Coxinha com Catupiry' });
  }

  const doRemove = () => {
    remove('/movimentacoes/2019-10/-LtbKck_33JdJqonlEII');
  }

  return (
    <div>
      <h1>My Money</h1>

      {data.loading ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}

      <button onClick={saveData}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={doRemove}>Delete</button>  
      <pre>{JSON.stringify(deleteData)}</pre>
    </div>
  );
}

export default App;
