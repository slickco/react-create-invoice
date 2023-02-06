import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '@coreui/react';
import Container from 'react-bootstrap/Container';

import App from './App';
// import NewInvoice from './NewInvoice';
// import AddRemove from './AddRemove';
// import NewBusiness from './NewBusiness';
// import CreateNewInvoice from './CreateNewInvoice';

import reportWebVitals from './reportWebVitals';
// import HeaderWithRouter from './Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container> 
        <App />
    {/* <HeaderWithRouter /> */}
    {/* <NewBusiness />
    <NewInvoice /> */}
    {/* <CreateNewInvoice /> */}
    </Container>
    </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
