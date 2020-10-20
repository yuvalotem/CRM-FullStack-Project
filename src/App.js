import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Link, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import './styles/App.css';
import Clients from './components/Clients';

function App() {
  return (
    <div className="App">
                <Navbar>
            <Navbar>
              <Navbar.Brand>
                <Link to="/">BuisCore</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar>
            <Navbar.Collapse>
              <Nav>
                    <LinkContainer to="/Clients">
                      <NavItem>Clients</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
            <Switch>
              <Route exact path="/" />
              <Route exact path="/Clients" component={Clients} />
              {/* <Route exact path="/Actions" component={Actions} /> */}
              {/* <Route component={NotFound} /> */}
            </Switch>

    </div>
  );
}

export default App;
