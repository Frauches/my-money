import React from 'react';

const AdicionarMes = () => {

  return (
    <>
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
    </>
  );
}

export default AdicionarMes;