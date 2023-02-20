import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CCol, CButton, CFormSelect,
CInputGroup, CInputGroupText, CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle} from '@coreui/react';

import {Form, Col, InputGroup, Row, Button, Accordion, ListGroup, ListGroupItem, Container, Table, CloseButton, Card, Stack, Alert, FormSelect, FloatingLabel, Modal, ModalBody, ModalDialog, ModalTitle } from 'react-bootstrap';
import { json } from "react-router";


function NewInvoice() {


  // const [apikey, setapikey] = useState("S0DQGFAYL8GpuiAPw5pd");
  const [apikey, setapikey] = useState("fd48e7589d2d4639bd439dae12fc6fa16af34e50b3bbbda35860a4fc9bd2261e");
  const [businessid, setBusinessid] = useState("");


  const [created_by_user_id, setCreated_by_user_id] = useState("lloyd@slickco.io");
  const [date_issued, setDate_issued] = useState(Date.now());
  const [new_date_issued, setNewDate_issued] = useState(Date)

  const dateIssuedConstructor = new Date();
  const temp_date = dateIssuedConstructor.getDate();
  dateIssuedConstructor.setDate(temp_date);
  const display_date_issued = dateIssuedConstructor.toLocaleDateString('en-CA');

  const [invoice_id, setInvoice_id] = useState("123");
  const [contact_id, setContact_id] = useState("");
  const [billingName, setBillingName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [payment_terms, setPayment_Terms] = useState("");
  const [payment_online_enabled, setPayment_online_enabled] = useState(Boolean);
  const [payment_instructions, setPayment_instructions] = useState("");

  const [line_items, setLine_items] = useState("");
  const [tax_rate, setTax_rate] = useState(0.0);
  const [total_tax, setTotal_tax] = useState(0);
  const [sub_total, setSub_total] = useState(0);
  const [total_due, setTotal_due] = useState(0);
  const [total_discount, setTotal_discount] = useState("");
  const [status, setStatus] = useState("");
  const [parent_project_id, setParent_project_id] = useState("");
  const [deposit_amount, setDeposit_amount] = useState(Number);
  const [recurring_frequency, setRecurring_frequency] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState(Date.now());

  const [invoiceCreated, setInvoiceCreated] = useState(false);
  const [newInvoiceId, setNewInvoiceId] = useState("");
  const [invoiceIdSet, setInvoiceIdSet] = useState(false);

  const [message, setMessage] = useState("");
  

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "api-key": "b5dcb16e99af272d8fbd01dd722201bf",
      "x-api-key": apikey,
      "x-business-id": businessid
    }
  };
  
  const liveUrl = "https://api.slickco.io/v0/invoices"



  const thesePaymentTerms = [
    {
      "name": "Hello Terms",
      "description": "Why you need to pay by this day",
      "days": 30,
      "paymentDueDate": "2019-08-24",
      "discount": 0,
      "penalty": 0
  }
]

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

  const handleSetSubTotal = () => {
    let subTotal = 0;
    itemFields.forEach((item) => {
      subTotal += item.total;
    })
    setSub_total(subTotal);
  }

  const handleSetTotalTax = () => {
    let totalTax = 0;
    itemFields.forEach((item) => {
      totalTax += item.total * tax_rate;
    })
    setTotal_tax(totalTax);
  }

  const handleSetTotalDue = () => {
    let totalDue = 0;
    itemFields.forEach((item) => {
      totalDue += item.total + (item.total * tax_rate);
    })
    setTotal_due(totalDue);
  }
  
      
  function updateTotals() {

    handleSetSubTotal();
    handleSetTotalTax();
    handleSetTotalDue();
    handlePaymentAmount();

  };

  // There must be a better way to handle this. Options like check if isNaN and check if null or "" are not working. Have not tried undefined yet.
  const handleUpdateTax = (e) => {
    let tax = 0;
    if (e.target.value <= 1 ) {
      tax = 0;
    } else {
      tax = e.target.value / 100;
    }

    setTax_rate(tax);
    handleSetTotalTax();
    handleSetTotalDue();
    handlePaymentAmount();
  }


  const updateTax = (e) => {
    let tax = 0;
    tax = e.target.value / 100;
    setTax_rate(tax)

    updateTotals()
    
  }

  const handleFormChange = (event, index) => {
    let data = [...itemFields];
    data[index][event.target.name] = event.target.value;
    data[index]['total'] = data[index]['quantity'] * data[index]['price']
    setitemFields(data);
    updateTotals()
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
   
    updateTotals()

  }

    // ✅ Remove one or more objects from state array
  const removeObjectFromArray = (index) => {
    // let data = [...itemFields];
    setitemFields(current =>
      current.filter((obj) => current.at(index) != obj),
    );
      
    updateTotals()
  };

  const [visible, setVisible] = useState(false)

  // Very good resource https://beta.reactjs.org/learn/updating-objects-in-state 

  const [clientDetails, setClientDetails] = useState(
    { 
      contactId: ""
      , billingName: ""
      , contactName: ""
      , phone: ""
      , email: "lloyd+test@slickco.io"

    },
  )


  const handleContactNameChange = (event) => {
    setClientDetails(
      {
        ...clientDetails,
        contactName: event.target.value

      }
    );
  }
  const handleBillingNameChange = (event) => {
    setClientDetails(
      {
        ...clientDetails,
        billingName: event.target.value

      }
    );
  }
  const handleEmailChange = (event) => {
    setClientDetails(
      {
        ...clientDetails,
        email: event.target.value

      }
    );
  }
  

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(liveUrl, {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
          // createdByUserId: created_by_user_id,
          // dateIssued: new Date(date_issued),
          dateIssued: date_issued,
          invoiceNumber: invoice_id,
          // clientDetails: contact_id,
          clientDetails: clientDetails,
          // clientDetails: Object.assign({
          //   billingName: billingName,
          //   contactName: contactName,
          //   email: email,
          // }),
          paymentTerms: thesePaymentTerms,
          paymentOnlineEnabled: payment_online_enabled,
          paymentInstructions: payment_instructions,
          // paymentnstructions: payment_instructions,
          // billing_period_start: billing_period_start,
          // billing_period_end: billing_period_end,
          // line_items: theseLineItems,
          // lineItems: Object.assign({}, itemFields),
          lineItems: Object.assign(itemFields),
          taxRate: tax_rate, 
          totalTax: 0, 
          subTotal: sub_total, 
          totalDue: total_due, 
          paymentDueDate: date_issued, 
          // totalDiscount: 0, 
          // status: "Draft", 
          // parentProjectId: parent_project_id,
          // depositAmount: deposit_amount, 
          // recurringFrequency: "Monthly"
        }),
      });
      let resJson = await res.json()
      .then(setVisible(false))
      .then((data) => {setNewInvoiceId(data["invoiceId"])})
      .then((data) => {alert("Created invoice! ID: " + data["invoiceId"])})
      .then(setInvoiceCreated(true));
      if (res.status === 200) {
        // setNewInvoiceId(resJson["invoiceId"])
        setVisible(false)
        // setInvoiceCreated(!invoiceCreated)
        
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    setFiles(e.target.files);
  };

  const handleNewInvoiceID = (e) => {
    setNewInvoiceId(e.target.value);
    setInvoiceIdSet(true);
  };


  function getSendUrl() {
    return liveUrl + "/" + newInvoiceId + "/send"
  }

  function getFiles() {
    return files
  }

  const data = new FormData();
  files.forEach((file, i) => {
    data.append(`file-${i}`, file, file.name);
  });

  let handleSend = async (e) => {
    e.preventDefault();
    const attachments = new FormData()
    attachments.append("attachments", getFiles())
    try {
      let res = await fetch(getSendUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey,
          "x-business-id": businessid,
        },
        // body: JSON.stringify("attachments:" + getFiles()),
        body: JSON.stringify(attachments),
        // body: {"attachments" : ""},
      });
      let resJson = await res.json()
      .then(setInvoiceCreated(false))
      .then((data) => {
        // alert("Sent invoice! Request ID: " + data["sendRequestId"])
        <>
      {
        <Alert variant={'success'}>
          Sent invoice! Request ID:  {data["sendRequestId"]}
        </Alert>
      }
    </>

      }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [amount, setAmount] = useState(total_due);
  const [paymentModal, setPaymentModal] = useState(false);
  
  const handlePaymentAmount = (e) => {
    setAmount(e.target.value);
  };

  const getTotalDue = () => {
    setAmount(total_due);
    return amount

  };

  let handlePayInvoice = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://api.slickco.io/v0/transactions/payments/invoice/" + newInvoiceId , {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
          timestamp: new Date(),
          amount: amount,
          description: "payment",
          method: "Cash",
          source: "Stripe",
          sourceReferenceId: "Payment reference",
          transaction_id: "dgdsgds"
          // paymentNotes: "Payment notes",
        }),
      });
      let resJson = await res.json()
      .then(setInvoiceCreated(false))
      .then((data) => {alert("Created payment! ID: " + data["transactionId"])}
      );  
    } catch (err) {
      console.log(err);
    }
  };


  const [businessIdsList, setBusinessIdsList] = useState([]);

  const handleSelectBusiness = async (e) => {

    setBusinessid(e)
    console.log(e)
    businessIdsList.map((entry) => {
      if (entry["id"] === e) {
        if (entry["settings"]["defaultTaxRate"] === null) {
          setTax_rate(0)
        }
        setTax_rate(entry["settings"]["defaultTaxRate"])
        console.log(entry["settings"]["defaultTaxRate"])
      }
    } 
    )
};

  
  const handleGetBusinessIDs = async () => {
    const bizOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "api-key": "b5dcb16e99af272d8fbd01dd722201bf",
        "x-api-key": apikey
        // "x-business-id": businessid
      }
    };

    try {
      let res = await fetch('https://api.slickco.io/v0/businesses', {
        method: "GET",
        headers: bizOptions.headers,
      });
      // let resJson = await res.json()
      // .then((data) => {setBusinessIdsList(data)}
      // .then((data) => {console.log(data)}
      // );

      const data = await res.json();
      setBusinessIdsList(data);
      console.log(data);
      
    } catch (err) {
      console.log(err);
    }
  };
 
    return (
      useEffect(() => {
        handleGetBusinessIDs();
      }, []),
      <div>
    <Container className='h-100 '>
    <Col>
            <h1>Create Invoice </h1>
            </Col>
    <Row className="justify-content-between">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="businessid">
                <Form.Label>Businesses</Form.Label>
                {/* <FloatingLabel controlId="floatingSelect" label="Select a business"> */}
                  {/* <CFormSelect type="form-select" name="businessids" size="sm" onChange={(e)=>setBusinessid(e.target.value)}> */}
                  <FormSelect type="form-select" name="businessids" size="auto" onChange={(e) => handleSelectBusiness(e.target.value)}>

                    <option value="0">Select a business</option>

                    {businessIdsList.map(business => (
                      <option value={business.id} >
                        "{business.operatingName}"
                      </option>
                    )
                    )}
                </FormSelect>

                  <Form.Label>Business ID</Form.Label>
                  <Form.Control type="text" name="businessid" label="businessid" size="auto"
                  value={businessid} placeholder="biz id" disabled='true'  onChange={(e)=>setBusinessid(e.target.value)}
                  />

                  
                </Form.Group>
                
              </Col>
              </Row>

              <hr />

          {/* <Row className="justify-content-between"> */}

          
          {/* </Row> */}
          {/* <hr /> */}
        <Form className="row g-3" onSubmit={handleSubmit}>
                <>
                {/* <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton> */}
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                  <CModalHeader>
                    <CModalTitle>Thanks for trying Slick!</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    {/* <p> We just need your APIKey and a Business ID to send this invoice </p> */}
                    <p> We just need a Business ID to create this invoice </p>


                    {/* <Form.Control type="text" id="apikey" label="API Key" 
                    value={apikey} onChange={(e)=>setapikey(e.target.value)} 
                    /> */}

                    <Form.Control type="text" id="businessId" label="Business ID" 
                    value={businessid} onChange={(e)=>setBusinessid(e.target.value)} 
                    />

                  {/* <p>Don't have this yet? Get in touch <CLink> api@slickco.io </CLink></p> */}

                  </CModalBody>

                  <CModalFooter className="justify-content-center">
                    {/* <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                    </CButton> */}
                    <CButton type="submit" onClick={(e) => handleSubmit(e)}>Create Invoice</CButton>
                  </CModalFooter>

                </CModal>
          </>

          <>
                {/* <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton> */}
                <CModal alignment="center" visible={invoiceCreated} onClose={() => setInvoiceCreated(false)}>
                  <CModalHeader>
                    <CModalTitle>Send Invoice</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    {/* <p> We just need your APIKey and a Business ID to send this invoice </p> */}
                    <div className="mb-3">
                      <Form.Label htmlFor="formFile" className="form-label">
                      Invoice ID
                      </Form.Label>
                    <Form.Control type="text" id="invoiceId" label="Invoice Id" placeholder={newInvoiceId} onChange={(e) => handleNewInvoiceID(e)} value={newInvoiceId}>
                      </Form.Control> 
                      </div>
                      < hr/>

                    <h4> Send or add an attachment </h4>

                    <div className="mb-3">
                    <Form.Label htmlFor="formFileMultiple">Multiple files input example</Form.Label>
                    <Form.Control type="file" id="formFileMultiple" onChange={(e) => handleFileUpload(e)} multiple/>
                    </div>

                    <hr/>



                  {/* <p>Don't have this yet? Get in touch <CLink> api@slickco.io </CLink></p> */}

                  </CModalBody>

                  <CModalFooter className="justify-content-center">
                    {/* <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                    </CButton> */}
                    <CButton type="submit" onClick={(e) => handleSend(e)}>Send Invoice</CButton>

                  </CModalFooter>

                </CModal>
          </>
          <>
                {/* <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton> */}
                <CModal alignment="center" visible={paymentModal} onClose={() => setPaymentModal(false)}>
                  <CModalHeader>
                    <CModalTitle>Pay Invoice</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    {/* <p> We just need your APIKey and a Business ID to send this invoice </p> */}
                    <div className="mb-3">
                      <Form.Label htmlFor="formFile" className="form-label">
                      Invoice ID
                      </Form.Label>
                    <Form.Control type="text" id="invoiceId" label="Invoice Id" placeholder={newInvoiceId} onChange={(e) => handleNewInvoiceID(e)} value={newInvoiceId}>
                      </Form.Control> 
                      </div>
                      < hr/>

                    

                    <h4>
                      Pay Invoice
                    </h4>


                    
                    <Form.Label>Amount</Form.Label>

                    <CInputGroup className="mb-3">
                            <CInputGroupText>$</CInputGroupText>

                    <Form.Control type="text" id="amount" label="Amount" value={amount} placeholder={total_due} onChange={(e)=>handlePaymentAmount(e)} />
                    </CInputGroup>




                  {/* <p>Don't have this yet? Get in touch <CLink> api@slickco.io </CLink></p> */}

                  </CModalBody>

                  <CModalFooter className="justify-content-center">
                    {/* <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                    </CButton> */}
                    <CButton type="submit" onClick={(e) => handlePayInvoice(e)}>Pay Invoice</CButton>
                  </CModalFooter>

                </CModal>
          </>



            {/* <h3>Business Info</h3> */}


              
            <h3>Biller Contact Info</h3>
            <Row className="justify-content-between">
                <Col md={6}>
                    {/* <Form.Control type="text" id="firstname" label="Contact Name" name='contactName'
                     onChange={(e)=>handleClientChange(e)} 
                    /> */}

                    <Form.Label>Contact Name</Form.Label>
                    <Form.Control type="text" label="Contact Name" name='contactName'
                     onChange={e=>handleContactNameChange(e)} value={clientDetails.contactName} 
                    placeholder="Conty Nahmé"
                    />
                </Col>
                <Col md={6}>
                    <Form.Label>Billing Name</Form.Label>
                    <Form.Control type="text" label="Billing Name" name='billingName'
                     onChange={(e)=>handleBillingNameChange(e)} value={clientDetails.billingName}
                    placeholder="Billy Nameson"
                    />
                </Col>
            </Row>
            <p>

            </p>
            <Row className="justify-content-between">
                <Col md={6}>
                <Form.Label>Client Email</Form.Label>
                    <Form.Control type="email" label="Client email" name="email" 
                    onChange={(e)=>handleEmailChange(e)} value={clientDetails.email}
                    placeholder="email@email.com"
                    />
                </Col>

            </Row>

            <hr />
            <h3>Invoice Details</h3>
            <Row className="justify-content-between">
                <Col md="3">
                <Form.Label>Issue Date</Form.Label>
                    <Form.Control type="date" id="date_issued" label="Issue Date" 
                    defaultValue={display_date_issued}
                    // value={date_issued} 
                    onChange={(e)=>setDate_issued(e.target.value)} />
                </Col>

                <Col md="3">
                    <Form.Label>Invoice Number</Form.Label>
                    <Form.Control type="number" value={invoice_id} label="Invoice Number" onChange={(e)=>setInvoice_id(e.target.value)} />
                </Col>

            </Row>
            

            <p></p>

            <Row className="justify-content-between">
                <Col md="3">
                    <CFormSelect id="terms" label="Payment terms">
                        <option>Same Day</option>
                        <option>Net 30</option>
                    </CFormSelect>
                </Col>
                <Col md="3">
                    <Form.Label>Payment Due Date</Form.Label>
                    <Form.Control type="date" id="dueDate" label="Due Date"
                    defaultValue={display_date_issued}
                    onChange={(e)=>setPaymentDueDate(e.target.value)} /> 
                </Col>
            </Row>
            
            <Row >
              <p></p>
                <Col md="3">
                  <Form.Check
                  type="switch"
                  id="sendReminders"
                  label="Send Payment Reminders"
                  />

                  <p></p>
                </Col>
            </Row>

            <Row className="justify-content-between">
                <Col md="3">
                    <CFormSelect id="frequency" label="Recurring Invoice" placeholder="Frequency">
                        <option></option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                    </CFormSelect>
                </Col>
            </Row>
            < hr/>



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

            

            <Container id="totals">
            < hr/>
            <h3>Totals</h3>
                <Row className="justify-content-end">
                    <Col md={6}>
                            <Form.Label className="col-sm-2 col-form-label">
                                <h6>Sub Total</h6>
                            </Form.Label>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>$</CInputGroupText>
                             
                              <Form.Control type="number" placeholder={itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 )} value={itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 )} readOnly disabled />

                            
                        </CInputGroup>
                    </Col>
                </Row>

                <Row className="justify-content-end" >
                    <Col md={6}>
                            <Form.Label className="col-sm-2 col-form-label">
                              <h6>Tax Rate</h6>
                            </Form.Label>
                      <CInputGroup>
                            <Form.Control type="decimal" min="0" placeholder="Eg. 10.5" defaultValue={tax_rate}
                            // value={tax_rate * 100} 
                            onChange={(e)=>handleUpdateTax(e)}/>
                            <CInputGroupText>%</CInputGroupText>
                        </CInputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-end">
                    <Col md={6}>
                            <Form.Label className="col-sm-2 col-form-label">
                                <h5>Total</h5>
                            </Form.Label>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>$</CInputGroupText>
                            <Form.Control type="number" value={ (itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 ) + itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 ) * tax_rate) } readOnly disabled />
                        </CInputGroup>
                    </Col>
                </Row>
                {/* </CForm> */}
            </Container>  
            <hr />
            <Container>
            <h3>Payment Information</h3>
            <Row>
            <Col md={6}>
              
                <Form.Control id="paymentinstructions" label="Payment Instructions" placeholder="How you would like to get paid..." as="textarea" rows={3} />
                
            </Col>
            </Row>
            </Container>
            <hr />
            <Row className="justify-content-md-end">
                      <Col md="auto">


                {/* <CButton variant="outline" color="secondary" >get link</CButton> */}
                {/* <CButton type="submit" >send</CButton> */}
                <Button onClick={() => setVisible(!visible)} >Create Invoice</Button> <Button onClick={() => setInvoiceCreated(!invoiceCreated)} >Send</Button> <Button onClick={() => setPaymentModal(!paymentModal)} >Pay</Button>
                
                </Col>
                <p></p>
                <p></p>

        </Row>
        </Form>


    </Container>
        {/* </form> */}
</div>
    );
}

export default NewInvoice;