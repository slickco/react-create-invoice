import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, Table, Button, CloseButton } from 'react-bootstrap'

export default function CreateInvoiceItems(props) {
  const [itemFields, setitemFields] = useState([
    { 
      name: ''
      , description: ''
      , price: 0.0 
      , quantity: 0.0
      , total: 0.0
      , serviceDate: new Date()
      
    },
  ]) 

  const handleFormChange = (event, index) => {
    let data = [...itemFields];
    data[index][event.target.name] = event.target.value;
    data[index]['total'] = data[index]['quantity'] * data[index]['price']
    setitemFields(data);
  }

  const addFields = () => {
    let object = {
      name: ''
      , description: ''
      , price: 0 
      , quantity: 0
      , total: 0
      , rate_type: "Hourly"
    }

    setitemFields([...itemFields, object])
  }

  const removeFields = (index) => {
    let data = [...itemFields];
    data.splice(index, 1)
    setitemFields(data)
   
    // updateTotals()

  }


return (
  // useEffect(() => {
  //   props.onItemChange(itemFields)
  // }, [itemFields]),

  

<Container id="items">
  <h3>Invoice Items</h3>
  <Table responsive="md" borderless >
      <thead> 
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody >
      {itemFields.map((form, index) => { return ( 
        <>
        <tr key={index} >

          <td >
            <Form.Control  type="text" name='name' id="name" label="Name" placeholder="Name" value={form.name} onChange={(e)=>handleFormChange(e, index)} />
          </td>
          <td>
            <Form.Control type="decimal" name="price" id="unitPrice" label="Unit Price" min="0" value={form.price} onChange={(e)=>handleFormChange(e, index)} />
          </td>
          <td>
            <Form.Control type="decimal" name="quantity" id="quantity" label="Quantity" min="0" value={form.quantity} onChange={(e)=>handleFormChange(e, index)} />
          </td>
          <td>
            <Form.Control type="decimal" name="total" id="total" label="Total" value={form.total} readOnly onChange={(e)=>handleFormChange(e, index)} />
          </td>
          <td>
          <CloseButton size="sm" onClick={() => removeFields(index)} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Form.Group as={Col} size="mb-2">
            <Form.Control type="text" id="description" label="Description" placeholder="Description" name="description" value={form.description} onChange={(e)=>handleFormChange(e, index)} />
            </Form.Group>
          </td>
          <td></td>
          <td>
            <Form.Control type="date" id="serviceDate" label="Service Date" name="serviceDate" 
            onChange={(e)=>handleFormChange(e, index)} />
          </td>

            </tr>
            </>
            )})}
      </tbody>
    </Table>

      <Row >
        <Col sm="3">
            <Button variant="secondary" size="sm" onClick={addFields}>Add More..</Button>
      </Col>
      </Row>
  </Container>
)
}