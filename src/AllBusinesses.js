import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Form, Col, InputGroup, Row, Button, Accordion, ListGroup, ListGroupItem, Container, Table, CloseButton, Modal, ModalBody, ModalDialog, setVisible, visible } from 'react-bootstrap';


const exampleBusiness = {
    "id": "BBmrbTzVdkUaDj3VwbJ54f",
    "operatingName": "string",
    "legalName": "string",
    "email": "string",
    "phone": "string",
    "address": {
      "addressLine1": "string",
      "addressLine2": "string",
      "city": "string",
      "zipCode": "string",
      "state": "string",
      "country": "string"
    },
    "website": "string",
    "settings": {
      "defaultTaxRate": 0,
      "defaultCurrency": "string",
      "taxId": "string",
      "businesType": null,
      "industry": "string",
      "logoUrl": "string"
    },
    "styling": {
      "logoUrl": "string",
      "faviconUrl": "string",
      "primaryColor": "#000000",
      "secondaryColor": "#FFFFFF",
      "metadata": {}
    },
    "documentSettings": {
      "sendReceipts": true,
      "sendReminders": true,
      "reminderDays": [
        -2,
        7,
        14,
        21,
        28
      ],
      "alertOverdue": true,
      "alertOverdueDays": [
        1,
        7,
        14,
        21,
        28
      ]
    },
    "paymentSettings": {
      "paymentOnlineEnabled": false,
      "paymentMethods": null,
      "paymentProviders": null,
      "defaultPaymentMethod": null,
      "defaultPaymentProvider": null,
      "defaultPaymentTerms": null
    },
    "ownerUserId": "string",
    "metadata": {}
  }



const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': 'S0DQGFAYL8GpuiAPw5pd'
    }
};

const baseUrl = 'https://api.slickco.io/v0/businesses';

const ViewBusiness = ({ match }) => {
    const [business, setBusiness] = useState({});
    const [loading, setLoading] = useState(true);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{business.operatingName}</h1>
            <p>{business.email}</p>
            <p>{business.phone}</p>
            <p></p>

        </div>
    );
};



const OneBusinessComponent = ({ data }) => {
    return (
        <div>
            <ViewBusiness map={data} />
        </div>
    );
};



const GetAllBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [modaldata, setModalData] = useState(exampleBusiness);

  useEffect(() => {
    const getBusinesses = async () => {
      const response = await fetch(baseUrl, options);
      const data = await response.json();
      console.log(data);
      setBusinesses(data);
      setLoading(false);
    };
    getBusinesses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClickBusiness = (e) => {
    console.log(e);
    setModalData(e);
    setVisible(true);
  }

  return (

    <div>
      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{modaldata.operatingName}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <p>Legal Name: <strong> {modaldata.legalName} </strong></p>
            <p>Email: <strong> {modaldata.email} </strong></p>
            <p>Phone: <strong>{modaldata.phone} </strong></p>
            {/* <p>Address: {modaldata.address.addressLine1}</p> */}
            <p>Website: <strong>{modaldata.website}</strong></p>
            <p>Default Tax Rate: <strong>{modaldata.settings.defaultTaxRate}</strong></p>
            <p>Default Currency: <strong>{modaldata.settings.defaultCurrency}</strong></p>
            <p>Tax ID: <strong>{modaldata.settings.taxId}</strong></p>
            <p>Business Type: <strong>{modaldata.settings.businesType}</strong></p>
            <p>Industry: <strong>{modaldata.settings.industry}</strong></p>
            

        </Modal.Body>
      </Modal>


            <Container>
            <h1>All Businesses</h1>
            <hr></hr>
              
                <Row>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Slick Business ID</th>
                            <th>Business Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            {/* <th>Address</th> */}
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {businesses.map(business => (
                            <tr onClick={ () => handleClickBusiness(business)} >
                                <td>{business.id}</td>
                                <td>{business.operatingName}</td>
                                <td>{business.email}</td>
                                <td>{business.phone}</td>
                                {/* <td>{business.address.addressLine1}</td> */}
                                <td>{business.website}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Row>
            </Container>

    </div>
  );
}

export default GetAllBusinesses;

