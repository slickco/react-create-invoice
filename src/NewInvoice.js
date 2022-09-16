import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
import { CForm, CCol, CFormInput, CButton, CFormSelect, CFormCheck, CContainer, 
CInputGroup, CInputGroupText, CFormLabel, CRow, CListGroup, CListGroupItem} from '@coreui/bootstrap-react';

import InvoiceHeader from "./InvoiceHeader";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "api-key": "b5dcb16e99af272d8fbd01dd722201bf",
    "x-provider-id": "FPWir3NZZyW4MiYWJXN5",
    "x-business-id": "6KYnUDZJy7SGHn2ga8Be"
  }
};

const liveUrl = "https://api.slickco.io/invoices"


function NewInvoice() {
  const [created_by_user_id, setCreated_by_user_id] = useState("");
  const [date_issued, setDate_issued] = useState();
  const [invoice_id, setInvoice_id] = useState("");
  const [contact_id, setContact_id] = useState("");
  const [payment_terms, setPayment_Terms] = useState("");
  const [payment_online_enabled, setPayment_online_enabled] = useState(Boolean);
  const [payment_instructions, setPayment_instructions] = useState("");
  const [billing_period_start, setBilling_period_start] = useState("");
  const [billing_period_end, setBilling_period_end] = useState("");
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

  const [message, setMessage] = useState("");
  
  const [item, setItem] = useState(JSON);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setDescription] = useState("");
  const [itemPrice, setPrice] = useState(Number);
  const [item_rate_type, setRate_type] = useState("");
  const [item_tax_rate, setItem_tax_rate] = useState(Number);
  const [item_quantity, setQuantity] = useState(Number);
  const [itemTotal, setTotal] = useState(Number);
  const [item_tags, setTags] = useState("");

  const theseLineItems = {
    "Item1": {
      "name": "string",
      "description": "string",
      "price": 0,
      "rate_type": "Hourly",
      "tax_rate": 0,
      "quantity": 0,
      "total": 0,
      "tags": [
        null
      ]
    },
    "Item2": {
      "name": "string",
      "description": "string",
      "price": 0,
      "rate_type": "Hourly",
      "tax_rate": 0,
      "quantity": 0,
      "total": 0,
      "tags": [
        null
      ]
    }
  }

  const thesePaymentTerms = {
    "name": "string",
  "description": "string",
  "terms": {
    "property1": {
      "days": 0,
      "discount": 0,
      "penalty": 0
    },
    "property2": {
      "days": 0,
      "discount": 0,
      "penalty": 0
    }
  }}
  
  // function getLineItems(itemFields) {
  //   let lineItems = []
  //   var i = 0
  //   itemFields.forEach(element => {
  //     lineItems = lineItems[i][element];
  //     i++;
  //   });


  //   // for (let index = 0; index (itemFields) < itemFields.length; index++) {
  //   //   lineItems = lineItems[index][itemFields[index]];
      
  //   // }
  //   return lineItems
  // }

  const [itemFields, setitemFields] = useState([
    { 
      name: ''
      , description: ''
      , price: 0 
      , quantity: 0
      , total: 0
      , rate_type: "Hourly"
      
    },
  ])

  const updateTotals = () => {
    var subTotal = 0;

    itemFields.forEach(i => {
      subTotal = subTotal + i['total']
    });

    if (subTotal === 0) {
      setSub_total(0)
      setTotal_due(0)
    }
    else {
    setSub_total(subTotal);
    setTotal_due(subTotal + (subTotal * tax_rate))
    }

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

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(liveUrl, {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
          created_by_user_id: created_by_user_id,
          date_issued: new Date(date_issued),
          invoice_id: invoice_id,
          contact_id: contact_id,
          payment_terms: thesePaymentTerms,
          payment_online_enabled: payment_online_enabled,
          payment_instructions: payment_instructions,
          payment_instructions: payment_instructions,
          billing_period_start: billing_period_start,
          billing_period_end: billing_period_end,
          // line_items: theseLineItems,
          line_items: Object.assign({}, itemFields),
          tax_rate: tax_rate, 
          total_tax: 0, 
          total_due: total_due, 
          total_discount: 0, 
          status: "Draft", 
          parent_project_id: parent_project_id,
          deposit_amount: deposit_amount, 
          recurring_frequency: "Monthly"
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setCreated_by_user_id("");
        setDate_issued("");
        setInvoice_id("");
        setContact_id("");
        setMessage("Invoice created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <div className="App">
    <CContainer>
      <CRow>
        
        </CRow>
        <CForm className="row g-3" onSubmit={handleSubmit}>

          <CRow className="justify-content-between">
            <CCol>
            <h1>Slick Co Demo </h1>
            </CCol>
          <CCol md="auto">
            <div gap-2 justify-content-md-end>
                <CButton variant="outline" color="secondary" >get link</CButton>
                <CButton type="submit" >send</CButton>
            
            </div>
                </CCol>
          </CRow>

            <h3>Contact Info</h3>
            <CRow className="justify-content-between">
                <CCol md={6}>
                    <CFormLabel>First Name</CFormLabel>
                    <CFormInput type="text" id="firstname" label="firstname" 
                    // value={created_by_user_id} onChange={(e)=>setCreated_by_user_id(e.target.value)} 
                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel>Last Name</CFormLabel>
                    <CFormInput type="text" id="lastname" label="lastname" 
                    // value={contact_id} onChange={(e)=>setContact_id(e.target.value)} 
                    />
                </CCol>
            </CRow>
            <CRow className="justify-content-between">
                <CCol md={6}>
                    <CFormLabel>Your email</CFormLabel>
                    <CFormInput type="email" id="yourEmail" label="yourEmail" value={created_by_user_id} onChange={(e)=>setCreated_by_user_id(e.target.value)} />
                </CCol>
                <CCol md={6}>
                    <CFormLabel>Customers email</CFormLabel>
                    <CFormInput type="email" id="theirEmail" label="theirEmail" value={contact_id} onChange={(e)=>setContact_id(e.target.value)} />
                </CCol>
            </CRow>


            <h3>Invoice Details</h3>
            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormLabel>Issue Date</CFormLabel>
                    <CFormInput type="date" id="date_issued" label="Issue Date" 
                    value={date_issued} 
                    onChange={(e)=>setDate_issued(e.target.value)} />
                </CCol>
            </CRow>
            
            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormLabel>Invoice Number</CFormLabel>
                    <CFormInput type="text" value={invoice_id} onChange={(e)=>setInvoice_id(e.target.value)} />
                </CCol>
                <CCol sm="3">
                    <CFormLabel>Reference / PO Number</CFormLabel>
                    <CFormInput type="text" />
                </CCol>
            </CRow>

            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormLabel>Payment terms</CFormLabel>
                    <CFormSelect id="terms" label="terms">
                        <option>Net 30</option>
                        <option>Same Day</option>
                    </CFormSelect>
                </CCol>
                <CCol sm="3">
                    <CFormLabel>Due Date</CFormLabel>
                    <CFormInput type="date" id="dueDate" label="duedate" />
                </CCol>
            </CRow>
            <CRow className="justify-content-between">
                <CCol sm="auto">
                    <CFormCheck type="checkbox" id="gridCheck" label="Send reminders" />
                </CCol>
            </CRow>
            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormLabel>Recurring Invoice</CFormLabel>
                    <CFormSelect id="frequency" label="frequency" placeholder="Frequency">
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                    </CFormSelect>
                </CCol>
            </CRow>
            <h3>Line Items</h3> <CListGroup flush id="item headers">
                    <CListGroupItem>
                        <CRow className="justify-content-between">
                            <CCol xs={4}>
                                <CFormLabel>Item name</CFormLabel>
                            </CCol>
                            <CCol xs>
                                <CFormLabel>Price</CFormLabel>
                            </CCol>
                            <CCol xs>
                                <CFormLabel>Qty</CFormLabel>
                            </CCol>
                            <CCol xs>
                                <CFormLabel>Total</CFormLabel>
                            </CCol>
                            <CCol xs></CCol>
                        </CRow>
                    </CListGroupItem>
                </CListGroup> {itemFields.map((form, index) => { return (
                <CListGroup flush key={index}>
                    <CListGroupItem>
                        <CRow className="justify-content-between">
                            <CCol xs="4"> {/* <CFormLabel>Item name</CFormLabel> */} <CFormInput name='name' placeholder='Name' onChange={event=> handleFormChange(event, index)} value={form.name} /> </CCol>
                            <CCol xs> {/* <CFormLabel>Price</CFormLabel> */} <CFormInput name='price' placeholder='0' type="number" onChange={event=> handleFormChange(event, index)} value={form.price} /> </CCol>
                            <CCol xs> {/* <CFormLabel>Qty</CFormLabel> */} <CFormInput name='quantity' placeholder='quantity' type="number" onChange={event=> handleFormChange(event, index)} value={form.quantity} /> </CCol>
                            <CCol xs> {/* <CFormLabel>Total</CFormLabel> */} <CFormInput name='total' placeholder='0.00' type='number' readOnly onChange={event=> handleFormChange(event, index)} value={form.total} /> </CCol>
                            <CCol xs> {/* <CFormLabel></CFormLabel> */} <CButton color="danger" variant="outline" size="sm" onClick={()=> removeFields(index)}>Remove</CButton>
                            </CCol>
                        </CRow>
                    </CListGroupItem>
                </CListGroup> 
                ) })} 

                <CListGroup flush>
                <CListGroupItem>
                <CRow className="justify-content-between">
                <CCol xs>
                    <CButton color="secondary" size="sm" onClick={addFields}>Add More..</CButton>
                </CCol>
            </CRow>
            </CListGroupItem>
            </CListGroup>

            <CContainer id="totals">
                <CRow className="justify-content-end">
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">
                                <h6>Sub Total</h6>
                            </CFormLabel>
                            <CInputGroupText>$</CInputGroupText>
                            <CFormInput type="number" placeholder={sub_total} value={sub_total} readOnly />
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CRow className="justify-content-end">
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">Tax</CFormLabel>
                            <CFormInput type="text" placeholder="GST" />
                            <CFormLabel className="col-sm-2 col-form-label">Tax Rate</CFormLabel>
                            <CFormInput type="number" value={tax_rate * 100} onChange={(e)=>updateTax(e)}/>
                            <CInputGroupText>%</CInputGroupText>
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CRow className="justify-content-end">
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">
                                <h5>Total</h5>
                            </CFormLabel>
                            <CInputGroupText>$</CInputGroupText>
                            <CFormInput type="number" value={total_due} readOnly />
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CContainer>  

            <CRow>
            <CCol md={6}>
                <CFormInput id="paymentinstructions" label="paymentinstructions" placeholder="Payment instructions..." />
            </CCol>
            </CRow>
            
        </CForm>
    </CContainer>
        {/* </form> */}
</div>
    );
}

export default NewInvoice;