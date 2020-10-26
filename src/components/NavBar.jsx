import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">BSManager</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/Clients"><Nav.Link>Clients</Nav.Link></LinkContainer>
        <LinkContainer to="/Actions"><Nav.Link>Actions</Nav.Link></LinkContainer>
        <LinkContainer to="/Analytics"><Nav.Link>Analytics</Nav.Link></LinkContainer>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>
  );
}
