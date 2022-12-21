import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import {Form, Col, InputGroup, Row, Button, Accordion, ListGroup, ListGroupItem, Container, FloatingLabel } from 'react-bootstrap';


export default function NewProvider() {

    const [active, setActive] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [contact, setContact] = useState("");
    const [dateJoined, setDateJoined] = useState("");
    const [friendlyName, setFriendlyName] = useState("");


    const handleSetProvider = (e) => {
        e.preventDefault();
        console.log("Provider: " + companyName + " " + contact + " " + dateJoined + " " + friendlyName);
        setCompanyName("");
        setContact("");
        setDateJoined("");
        setFriendlyName("");
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>New Provider</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="contactName">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="text" placeholder="Enter Contact Name" value={contact} onChange={(e) => setContact(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dateJoined">
                            <Form.Label>Date Joined</Form.Label>
                            <Form.Control type="date" placeholder="Enter Date Joined" value={dateJoined} onChange={(e) => setDateJoined(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="friendlyName">
                            <Form.Label>Friendly Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Friendly Name" value={friendlyName} onChange={(e) => setFriendlyName(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSetProvider}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}


