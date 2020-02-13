import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movimentacoes from './pages/Movimentacoes';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container">
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="/movimentacoes/:data" component={Movimentacoes} />
        </div>
      </div>
    </Router>
  );
}

export default App;
