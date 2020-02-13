import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Rest from '../../rest';

const baseUrl = "https://mymoney-3ea9b.firebaseio.com";
const { useGet, usePost, useDelete } = Rest(baseUrl);

const Movimentacoes = ({ match }) => {

  const movimentacoes = useGet(`/movimentacoes/${match.params.data}`);
  const [postData, salvarNovaMovimentacao] = usePost(`/movimentacoes/${match.params.data}`);
  const [removerData, removerMovimentacao] = useDelete();

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
      await salvarNovaMovimentacao({
        descricao,
        valor
      })
      setDescricao('');
      setValor(0);
      movimentacoes.refetch();
    }
  }

  const removerMovimentacaoClick = async (id) => {
    await removerMovimentacao(`/movimentacoes/${match.params.data}/${id}`);
    movimentacoes.refetch();
  }

  console.log(movimentacoes);
  if(movimentacoes.error && movimentacoes.status === 401){
    return <Redirect to="/login" />
  }

  return (
    <>
      <h1>Movimentacoes</h1>
      {movimentacoes.loading && <span>Carregando...</span>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data && (
            Object
              .keys(movimentacoes.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{movimentacoes.data[movimentacao].descricao}</td>
                    <td className="text-right">
                      {movimentacoes.data[movimentacao].valor}
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => removerMovimentacaoClick(movimentacao)}>-</button>
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