import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

function CreateNewInvoice() {


    const [apikey, setapikey] = useState("S0DQGFAYL8GpuiAPw5pd");
    const [businessid, setBusinessid] = useState("");
  
  
    const [created_by_user_id, setCreated_by_user_id] = useState("lloyd@slickco.io");
    const [date_issued, setDate_issued] = useState(Date.now());
    const [invoice_id, setInvoice_id] = useState("123");
    const [contact_id, setContact_id] = useState("");
    const [billingName, setBillingName] = useState("");
    const [contactName, setContactName] = useState("");
    const [email, setEmail] = useState("");
    const [payment_terms, setPayment_Terms] = useState("");
    const [payment_online_enabled, setPayment_online_enabled] = useState(Boolean);
    const [payment_instructions, setPayment_instructions] = useState("");
    // const [billing_period_start, setBilling_period_start] = useState(new Date(Date.now)); 
    // const [billing_period_end, setBilling_period_end] = useState(new Date(Date.now));
    const [line_items, setLine_items] = useState("");
    const [tax_rate, setTax_rate] = useState(Number);
    const [total_tax, setTotal_tax] = useState(Number);
    const [sub_total, setSub_total] = useState(0);
    const [total_due, setTotal_due] = useState(0);
    const [total_discount, setTotal_discount] = useState("");
    const [status, setStatus] = useState("");
    const [parent_project_id, setParent_project_id] = useState("");
    const [deposit_amount, setDeposit_amount] = useState(Number);
    const [recurring_frequency, setRecurring_frequency] = useState("");
  
    const [invoiceCreated, setInvoiceCreated] = useState(false);
    const [newInvoiceId, setNewInvoiceId] = useState("");
    const [message, setMessage] = useState("");
    
  
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "api-key": "b5dcb16e99af272d8fbd01dd722201bf",
        "api-key": apikey,
        "x-business-id": businessid
      }
    };
    
    const liveUrl = "https://api.slickco.io/invoices"
  
  
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
        , price: 0 
        , quantity: 0
        , total: 0
        // , rate_type: "Hourly"
        
      },
    ]) 
  
  
    function updateTotals() {
      var subTotal = 0;
      
      let data = [...itemFields]
  
      data.forEach(i => {
        subTotal = subTotal + i['total']
      });
    
      setSub_total(subTotal);
      setTotal_due(sub_total + (sub_total * tax_rate))
  
    };
  
    const updateTax = (e) => {
      setTax_rate(e.target.value / 100)
  
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
        , email: ""
  
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
  
    function getSendUrl() {
      return liveUrl + "/" + newInvoiceId + "/send"
    }
  
  
    let handleSend = async (e) => {
      e.preventDefault();
      // const thisInvoiceID = newInvoiceId
      try {
        let res = await fetch(getSendUrl(), {
          method: "POST",
          headers: {
            // "Content-Type": "multipart/form-data",
            "api-key": apikey,
            "x-business-id": businessid,
          },
          body: files,
        });
        let resJson = await res.json()
        .then(setInvoiceCreated(false))
        .then((data) => {alert("Sent invoice! Request ID: " + data["sendRequestId"])}
        );
      } catch (err) {
        console.log(err);
      }
    };

    return (
        <div className="App">
            <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div class="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div class="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"} onChange={(event) => date_issued(event.value)} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control type="number" value={this.state.invoiceNumber} name={"invoiceNumber"} onChange={(event) => this.editField(event)} min="1" style={{
                    maxWidth: '70px'
                  }} required="required"/>
              </div>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"} value={this.state.billToEmail} type="email" name="billToEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control placeholder={"Who is this invoice from?"} rows={3} value={this.state.billFrom} type="text" name="billFrom" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"} value={this.state.billFromEmail} type="email" name="billFromEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={this.state.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
            </Row>
            </Card>
            </Col>
            </Row>
            <Row>
            <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Item:</Form.Label>
                <Form.Control placeholder={"Item name"} rows={3} value={this.state.itemName} type="text" name="itemName" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Quantity:</Form.Label>
                <Form.Control placeholder={"Quantity"} value={this.state.quantity} type="number" name="quantity" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Price:</Form.Label>
                <Form.Control placeholder={"Price"} value={this.state.price} type="number" name="price" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Item:</Form.Label>
                <Form.Control placeholder={"Item name"} rows={3} value={this.state.itemName2} type="text" name="itemName2" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Quantity:</Form.Label>
                <Form.Control placeholder={"Quantity"} value={this.state.quantity2} type="number" name="quantity2" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Price:</Form.Label>
                <Form.Control placeholder={"Price"} value={this.state.price2} type="number" name="price2" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
            </Row>
          </Card>
          </Col>
          </Row>
          <Row>
          <Col md={8} lg={9}>
          <div className="d-flex flex-row align-items-start justify-content-between mb-3">
            <div className="d-flex flex-row align-items-center">
              <span className="fw-bold me-2">Notes:</span>
              <Form.Control as="textarea" rows={3} value={this.state.notes} name={"notes"} onChange={(event) => this.editField(event)} style={{
                  maxWidth: '300px'
                }}/>
            </div>
            <div className="d-flex flex-column align-items-end">
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Subtotal:</span>
                <Form.Control type="number" value={this.state.subtotal} name={"subtotal"} onChange={(event) => this.editField(event)} style={{
                    maxWidth: '150px'
                  }} required="required"/>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Tax:</span>
                <Form.Control type="number" value={this.state.tax} name={"tax"} onChange={(event) => this.editField(event)} style={{
                    maxWidth: '150px'
                  }} required="required"/>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Total:</span>
                <Form.Control type="number" value={this.state.total} name={"total"} onChange={(event) => this.editField(event)} style={{
                    maxWidth: '150px'
                  }} required="required"/>
              </div>
            </div>
          </div>
          </Col>
          </Row>
          </div>



        

                

    );

}

export default CreateNewInvoice;