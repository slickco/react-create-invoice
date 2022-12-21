import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { withRouter } from "react-router";
import NewBusiness from "./NewBusiness";
import NewInvoice from "./NewInvoice";
import App from "./App";

const Header = props => {
  const { location } = props;
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" className="App-logo">
        Slick Demo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" activeKey={location.pathname}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/advertisers">Advertisers</Nav.Link>
          <NavDropdown
            title="Publishers"
            id="basic-nav-dropdown"
            alignRight
            className="dropdown"
          >
            <NavDropdown.Item href="/publishers/radio">
              Radio Stations
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/publishers/podcasters">
              Audio Podcasters
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/publishers/videopodcasters">
              Video Podcasters
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/case-studies">Case Studies</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

function HeaderWithRouter() {
    const WithRouter = withRouter(Header);
    
  return (
    <Router>
      <Fragment>
        <WithRouter />
        <Route exact path="/" component={App} />
        <Route path="/one" component={NewBusiness} />
        <Route path="/two" component={NewInvoice} />
      </Fragment>
    </Router>
  );
}


// const Home = () => <h1>Home</h1>;
// const One = () => <h1>One</h1>;
// const Two = () => <h1>Two</h1>;


export default HeaderWithRouter;



// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Fragment>
//           <HeaderWithRouter />
//           <Route path="/" exact component={Home} />
//           <Route path="/one" exact component={One} />
//           <Route path="/two" exact component={Two} />
//         </Fragment>
//       </Router>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
