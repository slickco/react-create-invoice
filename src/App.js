import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Card } from "react-bootstrap";
import SidebarMenu from 'react-bootstrap';
import NewBusiness from './NewBusiness';
import NewInvoice from './NewInvoice';
import GridComplexExample from './GridComplexExample';
import CreateNewInvoice from './CreateNewInvoice';
import Businesses from './Businesses';
import NewProvider from './Provider';

export default function App() {
  return (
    <Router>
      <div>
      
        <nav>
          
          <Navbar expand="lg">
            <Navbar.Brand href="/" className="App-logo">
              Slick Demo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/new/business">New Business</Nav.Link>
                <Nav.Link href="/new/invoice">New Invoice</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/new/otherinvoice">
                    Other new Invoice
                    </NavDropdown.Item>
                  <NavDropdown.Item href="/users/4200">
                    Users
                    </NavDropdown.Item>
                  <NavDropdown.Item href="/gce">
                    Grid Complex Example
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/does-not-exist">
                    404
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              </Navbar.Collapse>

              </Navbar>

        </nav>

        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/new/invoice" element={<NewInvoice />} />
          <Route path="/new/otherinvoice" element={<CreateNewInvoice />} />
          {/* 👇️ handle dynamic path */}
          <Route path="/users/:userId" element={<Users />} />
          <Route path="/" element={< Home />} />
          <Route path="new/business" element={<NewBusiness />} />
          <Route path="/gce" element={<GridComplexExample />} />
          {/* 👇️ only match this when no other routes match */}
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found etc</h2>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Slick Demo - "Small B" Perspective </h2>;
}


function Users() {
  const params = useParams();

  return <h2>Users: {params.userId}</h2>;
}
