import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useParams} from 'react-router-dom';

import { Navbar, Nav } from "react-bootstrap";
import NewInvoice from './pages/NewInvoice';


export default function App() {
  return (
    <Router>
      <div>
      
        <nav>
          
          <Navbar expand="lg" className=''>
            <Navbar.Brand href="/new/invoice" className="App-logo">
              Slick Demo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

                <Nav.Link href="/new/invoice">Create Invoice</Nav.Link>
                <Nav.Link href="https://www.slickco.io">Slick Docs</Nav.Link>
              </Nav>
              </Navbar.Collapse>

              </Navbar>

        </nav>

        <Routes>  
          <Route path="/new/invoice" element={<NewInvoice />} />
          <Route path="/" element={< NewInvoice />} />
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

