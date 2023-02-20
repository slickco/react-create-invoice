import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import {Form, Col, InputGroup, Row, Button, Accordion, ListGroup, ListGroupItem, Container, Table, CloseButton } from 'react-bootstrap';


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
      'api-key': 'fd48e7589d2d4639bd439dae12fc6fa16af34e50b3bbbda35860a4fc9bd2261e'
    }
};

const baseUrl = 'https://api.slickco.io/v0/businesses';


// const ViewBusiness = (props) => {
//     const [business, setBusiness] = useState(exampleBusiness);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch(`${baseUrl}/${props.match.params.id}`, options)
//             .then(response => response.json())
//             .then(data => {
//                 setBusiness(data);
//                 setLoading(false);
//             });
//     }, [props.match.params.id]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <Container>
//             <Row>
//                 <Col>
//                     <h1>{business.operatingName}</h1>
//                 </Col>
//                 <Col>
//                     <Button variant="primary" size="lg" block>
//                         Edit
//                     </Button>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <h2>Business Details</h2>
//                     <Table striped bordered hover>
//                         <tbody>
//                             <tr>
//                                 <td>Operating Name</td>
//                                 <td>{business.operatingName}</td>
//                             </tr> 
//                             <tr>
//                                 <td>Legal Name</td>
//                                 <td>{business.legalName}</td>
//                             </tr>
//                             <tr>
//                                 <td>Email</td>
//                                 <td>{business.email}</td>
//                             </tr>
//                             <tr>
//                                 <td>Phone</td>
//                                 <td>{business.phone}</td>
//                             </tr>
//                             <tr>
//                                 <td>Address</td>
//                                 <td>{business.address.addressLine1}</td>
//                             </tr>
//                             <tr>
//                                 <td>Address 2</td>
//                                 <td>{business.address.addressLine2}</td>
//                             </tr>
//                             <tr>
//                                 <td>City</td>
//                                 <td>{business.address.city}</td>
//                             </tr>
//                             <tr>
//                                 <td>Zip Code</td>
//                                 <td>{business.address.zipCode}</td>
//                             </tr>
//                             <tr>
//                                 <td>State</td>
//                                 <td>{business.address.state}</td>
//                             </tr>
//                             <tr>
//                                 <td>Country</td>
//                                 <td>{business.address.country}</td>
//                             </tr>
//                             <tr>
//                                 <td>Website</td>
//                                 <td>{business.website}</td>
//                             </tr>
//                             <tr>
//                                 <td>Default Tax Rate</td>
//                                 <td>{business.settings.defaultTaxRate}</td>
//                             </tr>
//                             <tr>
//                                 <td>Default Currency</td>
//                                 <td>{business.settings.defaultCurrency}</td>
//                             </tr>
//                             <tr>
//                                 <td>Tax ID</td>
//                                 <td>{business.settings.taxId}</td>
//                             </tr>
//                             <tr>
//                                 <td>Business Type</td>
//                                 <td>{business.settings.businesType}</td>
//                             </tr>
//                             <tr>
//                                 <td>Industry</td>
//                                 <td>{business.settings.industry}</td>
//                             </tr>
//                             <tr>
//                                 <td>Logo URL</td>
//                                 <td>{business.settings.logoUrl}</td>
//                             </tr>
//                             <tr>
//                                 <td>Primary Color</td>
//                                 <td>{business.styling.primaryColor}</td>
//                             </tr>
//                             <tr>
//                                 <td>Secondary Color</td>
//                                 <td>{business.styling.secondaryColor}</td>
//                             </tr>
//                             <tr>
//                                 <td>Logo URL</td>
//                                 <td>{business.styling.logoUrl}</td>
//                             </tr>
//                             <tr>
//                                 <td>Favicon URL</td>
//                                 <td>{business.styling.faviconUrl}</td>
//                             </tr>
//                             <tr>
//                                 <td>Send Receipts</td>
//                                 <td>{business.documentSettings.sendReceipts ? 'Yes' : 'No'}</td>
//                             </tr>
//                             <tr>
//                                 <td>Send Reminders</td>
//                                 <td>{business.documentSettings.sendReminders ? 'Yes' : 'No'}</td>
//                             </tr>
//                             <tr>
//                                 <td>Reminder Days</td>
//                                 <td>{business.documentSettings.reminderDays.map(day => <div>{day}</div>)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Alert Overdue</td>
//                                 <td>{business.documentSettings.alertOverdue ? 'Yes' : 'No'}</td>
//                             </tr>
//                             <tr>
//                                 <td>Alert Overdue Days</td>
//                                 <td>{business.documentSettings.alertOverdueDays.map(day => <div>{day}</div>)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Payment Online Enabled</td>
//                                 <td>{business.paymentSettings.paymentOnlineEnabled ? 'Yes' : 'No'}</td>
//                             </tr>
//                             <tr>
//                                 <td>Payment Methods</td>
//                                 <td>{business.paymentSettings.paymentMethods}</td>
//                             </tr>
//                             <tr>
//                                 <td>Payment Providers</td>
//                                 <td>{business.paymentSettings.paymentProviders}</td>
//                             </tr>
//                             <tr>
//                                 <td>Payment Provider Settings</td>
//                                 <td>{business.paymentSettings.paymentProviderSettings}</td>
//                             </tr>
//                             <tr>
//                                 <td>Payment Terms</td>
//                                 <td>{business.paymentSettings.paymentTerms}</td>
//                             </tr>
//                             <tr>
//                                 <td>Payment Terms Settings</td>
//                                 <td>{business.paymentSettings.paymentTermsSettings}</td>
//                             </tr>
//                             <tr>
//                                 <td>Payment Terms Settings</td>
//                                 <td>{business.paymentSettings.paymentTermsSettings}</td>
//                             </tr>
                            

//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </Container>
//     );

    
// }


const ViewBusiness = (props) => {
    const [business, setBusiness] = useState(exampleBusiness);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl}/${props.match.params.id}`, options)
            .then(response => response.json())
            .then(data => {
                setBusiness(data);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{business.operatingName}</h1>
            <p>{business.email}</p>
            <p>{business.phone}</p>
            <p>{business.address.addressLine1}</p>
            <p>{business.address.addressLine2}</p>
            <p>{business.address.city}</p>
            <p>{business.address.zipCode}</p>
            <p>{business.address.state}</p>
            <p>{business.address.country}</p>
            <p>{business.website}</p>
            <p>{business.settings.defaultTaxRate}</p>
            <p>{business.settings.defaultCurrency}</p>
            <p>{business.settings.taxId}</p>
            <p>{business.settings.businesType}</p>
            <p>{business.settings.industry}</p>
            <p>{business.settings.logoUrl}</p>
            <p>{business.styling.logoUrl}</p>
            <p>{business.styling.faviconUrl}</p>
            <p>{business.styling.primaryColor}</p>
            <p>{business.styling.secondaryColor}</p>
            <p>{business.styling.metadata}</p>
            <p>{business.documentSettings.sendReceipts}</p>
            <p>{business.documentSettings.sendReminders}</p>
            <p>{business.documentSettings.reminderDays}</p>
            <p>{business.documentSettings.alertOverdue}</p>
            <p>{business.documentSettings.alertOverdueDays}</p>
            <p>{business.paymentSettings.paymentOnlineEnabled}</p>
            <p>{business.paymentSettings.paymentMethods}</p>
            <p>{business.paymentSettings.paymentProviders}</p>
            <p>{business.paymentSettings.defaultPaymentMethod}</p>
            <p>{business.paymentSettings.defaultPaymentProvider}</p>
            <p>{business.paymentSettings.defaultPaymentTerms}</p>
            <p>{business.ownerUserId}</p>
            <p>{business.metadata}</p>
        </div>

    );
}



export default ViewBusiness;