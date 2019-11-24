import React from 'react';
import Rest from './rest';

const baseUrl = "https://mymoney-3ea9b.firebaseio.com";
const { useGet, usePost, useDelete } = Rest(baseUrl);

function App() {

  const data = useGet("/meses");
  // const [postData, post] = usePost("/movimentacoes/2019-10");
  // const [deleteData, remove] = useDelete();

  const saveData = () => {
    // post({ valor: 7, descricao: 'Coxinha com Catupiry' });
  }

  const doRemove = () => {
    // remove('/movimentacoes/2019-10/-LtbKck_33JdJqonlEII');
  }

  return (
    <div>
      <nav className="nav navbar-light bg-light">
        <div className="container">
          <a href="/" className="navbar-brand">My Money</a>
        </div>
      </nav>

      <div className="container">
        <h2>Adicionar Mês</h2>
        <select>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>

        <select>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <button>Adicionar Mês</button>

        {
          data.loading ? <span>Carregando...</span> : (
            <table className="table table-striped">
              <thead>
                <th>Mês</th>
                <th>Previsão de Entrada</th>
                <th>Entrada</th>
                <th>Previsão de Saída</th>
                <th>Saída</th>
              </thead>
              <tbody>
                {
                  Object
                    .keys(data.data)
                    .map(mes => {
                      return (
                        <tr key={mes}>
                          <td>{mes}</td>
                          <td>{data.data[mes].previsao_entrada}</td>
                          <td>{data.data[mes].entradas}</td>
                          <td>{data.data[mes].previsao_saida}</td>
                          <td>{data.data[mes].saidas}</td>
                        </tr>
                      )
                    })
                }
                <tr></tr>
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
}

export default App;
