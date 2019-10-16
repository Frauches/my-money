import React from 'react';
import { useGet } from './useGet';
import { usePost } from './usePost';

function App() {

  const url = 'https://mymoney-3ea9b.firebaseio.com/movimentacoes/2019-10.json';
  const data = useGet(url);
  const [postData, post] = usePost(url);

  const saveData = () => {
    post({ valor: 7, descricao: 'Coxinha com Catupiry' });
  }

  return (
    <div>
      <h1>My Money</h1>

      {data.loading ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}

      <button onClick={saveData}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
    </div>
  );
}

export default App;
