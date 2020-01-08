import React from 'react';
import Header from './components/Header';
import Meses from './Meses';
import AdicionarMes from './AdicionarMes';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <AdicionarMes />
        <Meses />
      </div>
    </div>
  );
}

export default App;
