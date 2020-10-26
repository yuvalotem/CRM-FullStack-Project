import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Clients from './components/Clients';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react'
import Actions from './components/Actions';
import NotFound from './components/NotFound';
import Analytics from './components/Analytics';

const App = (observer((props) => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Clients} />
        <Route exact path="/Clients" component={Clients} />
        <Route exact path="/Actions" component={Actions} />
        <Route exact path="/Analytics" component={Analytics} />
        <Route component={NotFound} />
      </Switch>

    </div>
  );
}))

export default App;
