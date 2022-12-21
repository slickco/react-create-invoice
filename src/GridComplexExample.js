import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';

function GridComplexExample() {

  // https://stackoverflow.com/questions/49277112/react-js-how-to-set-a-default-value-for-input-date-type
  const today = new Date();
  const numberOfDaysToAdd = 3;
  const date = today.setDate(today.getDate() + numberOfDaysToAdd); 
  const defaultValue = new Date(date).toISOString().split('T')[0]

  
  const ddate = new Date();
  const futureDate = ddate.getDate() + 3;
  ddate.setDate(futureDate);
  const ddefaultValue = ddate.toLocaleDateString('en-CA');
  // const dtoday = ddate.toLocaleDateString('en-CA');
  
  const ttoday = new Date();
  const default_issue_date = ttoday.getDate();
  ttoday.setDate(default_issue_date);
  const display_issue_date = ttoday.toLocaleDateString('en-CA');


  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="dateSelector">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" defaultValue={display_issue_date} />
        </Form.Group>
        </Row>



      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Row className="align-items-center">
        <Col xs="auto">
        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Username
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="Username" />
          </InputGroup>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default GridComplexExample;