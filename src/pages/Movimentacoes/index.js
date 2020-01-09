import React from 'react';
import Rest from '../../rest';

const baseUrl = "https://mymoney-3ea9b.firebaseio.com";
const { useGet } = Rest(baseUrl);

const Movimentacoes = ({ match }) => {
  const data = useGet(`/movimentacoes/${match.params.data}`);

  return (
    <>
      <h1>Movimentacoes</h1>
      {data.loading && <span>Carregando...</span>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.data && (
            Object
              .keys(data.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{data.data[movimentacao].descricao}</td>
                    <td>{data.data[movimentacao].valor}</td>
                  </tr>
                )
              })
          )}
        </tbody>
      </table>
    </>
  )
}

export default Movimentacoes;