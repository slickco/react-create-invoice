import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CForm, CCol, CFormInput, CButton, CFormSelect, CFormCheck, CContainer, 
CInputGroup, CInputGroupText, CFormLabel, CRow, CListGroup, CListGroupItem, setVisible, visible, CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle, CTooltip, CLink} from '@coreui/react';

import {Form, Col, InputGroup, Row, Button, Accordion, ListGroup, ListGroupItem, Container, FloatingLabel } from 'react-bootstrap';

function NewBusiness() {
    const [visible, setVisible] = useState(false);

    const [operatingName, setOperatingName] = useState("");
    const [legalName, setLegalName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState(
        { addressLine1: "146 Oberon Street", city: "Coogee", state: "New South Wales", zipCode: "2034", country: "Australia" }
    );
    // const [addressLine1, setAddressLine1] = useState("");
    // const [addressLine2, setAddressLine2] = useState("");
    // const [city, setCity] = useState("");
    // const [zipCode, setZipCode] = useState("");
    // const [state, setState] = useState("");
    // const [country, setCountry] = useState("");
    const [settings, setSettings] = useState(
        {
            defaultCurrency: "AU", defaultTaxRate: "0.1", logoUrl: "", primaryColour: "", secondaryColour: "", tertiaryColour: "",
        }
    );
    // const [defaultTaxRate, setDefaultTaxRate] = useState("");
    // const [defaultCurrency, setDefaultCurrency] = useState("");
    // const [logoUrl, setLogoUrl] = useState("");
    // const [primaryColour, setPrimaryColour] = useState("");
    // const [secondaryColour, setSecondaryColour] = useState("");


    const handleOperatingNameChange = (event) => {
        setOperatingName(event.target.value);
    }

    const handleLegalNameChange = (event) => {
        setLegalName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleAddressLine1Change = (event) => {
        setAddress({ ...address, addressLine1: event.target.value });
    }

    const handleAddressLine2Change = (event) => {
        setAddress({ ...address, addressLine2: event.target.value });
    }

    const handleCityChange = (event) => {
        setAddress({ ...address, city: event.target.value });
    }

    const handleZipCodeChange = (event) => {
        setAddress({ ...address, zipCode: event.target.value });
    }

    const handleStateChange = (event) => {
        setAddress({ ...address, state: event.target.value });
    }

    const handleCountryChange = (event) => {    
        setAddress({ ...address, country: event.target.value });
    }

    const handleDefaultTaxRateChange = (event) => {
        setSettings({ ...settings, defaultTaxRate: event.target.value });
    }

    const handleDefaultCurrencyChange = (event) => {
        setSettings({ ...settings, defaultCurrency: event.target.value });
    }

    const handleLogoUrlChange = (event) => {
        setSettings({ ...settings, logoUrl: event.target.value });
    }

    const handlePrimaryColourChange = (event) => {  
        setSettings({ ...settings, primaryColour: event.target.value });
    }

    const handleSecondaryColourChange = (event) => {
        setSettings({ ...settings, secondaryColour: event.target.value });
    }


    let handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            operatingName: operatingName,
            legalName: legalName,
            email: email,
            address: address,
            settings: settings
        }
        console.log(data);
        let result = await fetch("https://api.slickco.io/v0/businesses", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "api-key": "S0DQGFAYL8GpuiAPw5pd"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => alert("Set up business. ID: " + data["businessId"]));
        // alert("created business"+ result.json()["businessId"]);
        // , result.body["businessId"]);
    }

    return (
        <div>
            <Container>
            <Col>
                <p></p>
            {/* <h1>Programa Demo</h1> */}
            <h2>Create Business </h2>
            <hr></hr>
            </Col>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>

                            <FloatingLabel label="Operating Name" className="mb-3" controlId="OperatingName" >
                            
                            <Form.Control type="text" value={operatingName} onChange={handleOperatingNameChange} placeholder="Operating Name" />
                            
                            </FloatingLabel> 
                            
                            <FloatingLabel
                            label="Legal Name" className="mb-3" controlId="legalName" 
                            >
                            <Form.Control type="text" value={legalName} onChange={handleLegalNameChange} placeholder="Legal Name" />

                            </FloatingLabel>
                            <FloatingLabel
                            label="Email" className="mb-3" controlId="email"
                            >
                                <Form.Control type="text" value={email} onChange={handleEmailChange} placeholder="Email" />


                            </FloatingLabel>
                            

                            <FloatingLabel
                            label="logoUrl" className="mb-3" controlId="logoUrl"
                            >
                                <Form.Control type="text" value={settings.logoUrl} onChange={handleLogoUrlChange} placeholder="logo" />
                            </FloatingLabel>




                            <Form.Label htmlFor="primaryColour" >
                            Primary Colour
                            </Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="primaryHash">#</InputGroup.Text>
                                    <Form.Control  controlId="primaryColour" type="text" value={settings.primaryColour} onChange={handlePrimaryColourChange} placeholder="Primary Colour" />
                            </InputGroup>




                            <Form.Label htmlFor="secondaryColour" >
                                Secondary Colour
                                </Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="secondaryHash">#</InputGroup.Text>
                                <Form.Control type="text" value={settings.secondaryColour} onChange={handleSecondaryColourChange} placeholder="Secondary Colour"  />
                            </InputGroup>



                                    


                            <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Address</Accordion.Header>
                                <Accordion.Body>
                                <FloatingLabel 
                            label="Address Line 1" className="mb-3" controlId="addressLine1"
                            >
                                <Form.Control type="text" value={address.addressLine1} onChange={handleAddressLine1Change} placeholder="Address Line 1" />
                            </FloatingLabel>

                            <FloatingLabel
                            label="Address Line 2" className="mb-3" controlId="addressLine2"
                            >
                                <Form.Control type="text" value={address.addressLine2} onChange={handleAddressLine2Change} placeholder="Address Line 2" />
                            </FloatingLabel>

                            <FloatingLabel
                            label="City" className="mb-3" controlId="city"
                            >
                                <Form.Control type="text" value={address.city} onChange={handleCityChange} placeholder="City" />
                            </FloatingLabel>
                            
                            <FloatingLabel
                            label="Zip Code" className="mb-3" controlId="zipCode"
                            > 
                            <Form.Control type="text" value={address.zipCode} onChange={handleZipCodeChange} placeholder="Zip Code" />
                            </FloatingLabel>

                            <FloatingLabel
                            label="State" className="mb-3" controlId="state"
                            >
                                <Form.Control type="text" value={address.state} onChange={handleStateChange}    placeholder="State" />
                            </FloatingLabel>

                            <FloatingLabel
                            label="Country" className="mb-3" controlId="country"
                            >
                                <Form.Control type="text" value={address.country} onChange={handleCountryChange} placeholder="Country" />
                            </FloatingLabel>
                                </Accordion.Body>
                            </Accordion.Item>


                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Settings</Accordion.Header>
                                <Accordion.Body>


                                    <FloatingLabel
                            label="Default Tax Rate" className="mb-3" controlId="defaultTaxRate"
                            >
                                <Form.Control type="text" value={settings.defaultTaxRate} onChange={handleDefaultTaxRateChange} placeholder="Default Tax Rate" />
                            </FloatingLabel>

                            <FloatingLabel
                            label="Default Currency" className="mb-3" controlId="defaultCurrency"
                            >
                                <Form.Control type="text" value={settings.defaultCurrency} onChange={handleDefaultCurrencyChange} placeholder="Default Currency" />
                            </FloatingLabel>

                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>
                                <br>
                                </br>
                            <Button type="submit">Create Business</Button>
                            <br></br>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )


}


export default NewBusiness;