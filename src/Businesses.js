import { useEffect, useRef, useState } from "react";
import {Form, Col, InputGroup, Row, Button, Accordion, ListGroup, ListGroupItem, Container, Table, CloseButton } from 'react-bootstrap';

export default function Businesses() {

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': 'S0DQGFAYL8GpuiAPw5pd'
    }
};

const baseUrl = 'https://api.slickco.io/v0/businesses';

const [businessids, setBusinessIds] = useState([]);
const [businesses, setBusinesses] = useState([]);

const handleBusinessIds = async () => {
    // const response = await fetch('https://api.sandbox.paypal.com/v1/customer/partners/APP-80W284485P519543T/business-accounts', options);
    const response = await fetch(baseUrl, options);
    const data = await response.json();
    console.log(data);
    setBusinessIds(data);
    console.log(businessids);
    // return data;
    };

const handleBusiness = async (id) => { 
    // const response = await fetch(`https://api.sandbox.paypal.com/v1/customer/partners/APP-80W284485P519543T/business-accounts/${id}`, options);
    var thisUrl = baseUrl + '/' + id;
    const response = await fetch(thisUrl, options);
    const data = await response.json();
    console.log(data);
    setBusinesses(data);
    // console.log(businesses);
    // return data;
    };


const getBusinessIds = async () => {
    fetch('https://api.slickco.io/businesses', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

const getBusiness = async (id) => {  
  fetch('https://api.slickco.io/businesses/${id}', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}



const Business =  {
      operatingName: 'string',
      legalName: 'string',
      email: 'string',
      phone: 'string',
      address: {
        addressLine1: 'string',
        addressLine2: 'string',
        city: 'string',
        zip_code: 'string',
        state: 'string',
        country: 'string'
      },
      website: 'string',
      ownerUserId: 'string',
      settings: {
        defaultTaxRate: 0,
        defaultCurrency: 'string',
        taxId: 'string',
        businessType: 'string',
        industry: 'string',
        logoUrl: 'string',
        primaryColour: '#000000'
      },
      invoiceSettings: {
        sendReminders: 'string',
        defaultMessage: 'string',
        paymentOnlineEnabled: true,
        defaultPaymentTerms: 'string'
      }
    }

    useEffect (() => { 
        handleBusinessIds();
        businessids.forEach(b => {
            handleBusiness(b); 
        });
    }, []);

    return (
        <div>
            <h1>Businesses</h1>
            {/* <Button onClick={businessids.forEach(b => {handleBusiness(b)})}>Get Business</Button> */}
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th>Business ID</th>
                        <th>Business Name</th>
                        <th>Business Email</th>
                        <th>Business Phone</th>
                        <th>Business Address</th>
                        <th>Business Website</th>
                        <th>Business Owner</th>
                        <th>Business Settings</th>
                        <th>Business Invoice Settings</th>
                    </tr> 
                </thead>
                <tbody>
                    {businesses.map(business => (
                        <tr key={business.id}>
                            {/* <td>{business.id}</td> */}
                            <td>{business.operatingName}</td>
                            <td>{business.email}</td>
                            <td>{business.phone}</td>
                            {/* <td>{business.address.addressLine1}</td>
                            <td>{business.website}</td>
                            <td>{business.ownerUserId}</td>
                            <td>{business.settings.defaultTaxRate}</td>
                            <td>{business.invoiceSettings.sendReminders}</td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>  
    )
}