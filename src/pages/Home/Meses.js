import React from 'react';
import Rest from '../../rest';
import { Link } from 'react-router-dom';

const baseUrl = "https://mymoney-3ea9b.firebaseio.com";
const { useGet } = Rest(baseUrl);


const Meses = () => {
  const data = useGet('/meses');

  if (data.loading) {
    return <span>Carregando...</span>;
  }
  if (Object.keys(data.data).length > 0) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Previsão de Entrada</th>
            <th>Entrada</th>
            <th>Previsão de Saída</th>
            <th>Saída</th>
          </tr>
        </thead>
        <tbody>
          {
            Object
              .keys(data.data)
              .map(mes => {
                return (
                  <tr key={mes}>
                    <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
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
  return null;
}

export default Meses;