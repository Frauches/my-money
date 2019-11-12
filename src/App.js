import React from 'react';
import { useGet } from './useGet';
import { usePost } from './usePost';
import { useDelete } from './useDelete';

function App() {

  const url = 'https://mymoney-3ea9b.firebaseio.com/movimentacoes/2019-10.json';
  const data = useGet(url);
  const [postData, post] = usePost(url);
  const [deleteData, remove] = useDelete();

  const saveData = () => {
    post({ valor: 7, descricao: 'Coxinha com Catupiry' });
  }

  const doRemove = () => {
    remove('https://mymoney-3ea9b.firebaseio.com/movimentacoes/2019-10/-LrHJqnEmvxd4KFiCA9Z.json');
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
