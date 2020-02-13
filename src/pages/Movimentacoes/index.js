import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Rest from '../../rest';

const baseUrl = "https://mymoney-3ea9b.firebaseio.com";
const { useGet, usePost, useDelete } = Rest(baseUrl);

const Movimentacoes = ({ match }) => {
  const data = useGet(`/movimentacoes/${match.params.data}`);
  const [postData, salvar] = usePost(`/movimentacoes/${match.params.data}`);
  const [removerData, remover] = useDelete();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);

  const onChangeDescricao = (event) => {
    setDescricao(event.target.value);
  }

  const onChangeValor = (event) => {
    setValor(event.target.value);
  }

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && descricao.length > 0 && valor.search(/^[-]?\d+(\.)?\d+?$/ >= 0)) {
      await salvar({
        descricao,
        valor
      })
      setDescricao('');
      setValor(0);
      data.refetch();
    }
  }

  const removerMovimentacao = async (id) => {
    await remover(`/movimentacoes/${match.params.data}/${id}`);
    data.refetch();
  }

  console.log(data);
  if(data.error && data.status === 401){
    return <Redirect to="/login" />
  }

  return (
    <>
      <h1>Movimentacoes</h1>
      {data.loading && <span>Carregando...</span>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Valor</th>
            <th>Ações</th>
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
                    <td className="text-right">
                      {data.data[movimentacao].valor}
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => removerMovimentacao(movimentacao)}>-</button>
                    </td>
                  </tr>
                )
              })
          )}
          <tr>
            <td><input type="text" value={descricao} onChange={onChangeDescricao} /></td>
            <td colSpan={2}>
              <input type="number" value={valor} onChange={onChangeValor} />
              <button className="btn btn-info" onClick={salvarMovimentacao}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Movimentacoes;