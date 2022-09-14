import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CForm, CCol, CFormInput, CButton, CFormSelect, CFormCheck, CContainer, 
CInputGroup, CInputGroupText, CFormLabel, CRow, CListGroup, CListGroupItem} from '@coreui/bootstrap-react';


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
  const [date_issued, setDate_issued] = useState(Date.UTC);
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
  const [total_due, setTotal_due] = useState(Number);
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

  const [itemFields, setitemFields] = useState([
    { name: '', price: 0 , quantity: 0, total: 0 },
  ])

  const handleFormChange = (event, index) => {
    let data = [...itemFields];
    data[index][event.target.name] = event.target.value;
    setitemFields(data);
  }

  const addFields = () => {
    let object = {
      name: '',
      price: 0 , 
      quantity: 0, 
      total: 0
    }

    setitemFields([...itemFields, object])
  }

  const removeFields = (index) => {
    let data = [...itemFields];
    data.splice(index, 1)
    setitemFields(data)
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(liveUrl, {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
          created_by_user_id: created_by_user_id,
          date_issued: "2019-08-24T14:15:22Z",
          // date_issued: date_issued,
          invoice_id: invoice_id,
          contact_id: contact_id,
          payment_terms: thesePaymentTerms,
          payment_online_enabled: payment_online_enabled,
          payment_instructions: payment_instructions,
          payment_instructions: payment_instructions,
          billing_period_start: billing_period_start,
          billing_period_end: billing_period_end,
          line_items: theseLineItems,
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
            <CContainer sm>
        <CForm className="row g-3" onSubmit={handleSubmit} >

        <CCol xs={12} className="d-grid gap-2 d-md-flex justify-content-md-end">
    <CButton type="submit" className="me-md-2" >send</CButton>
  </CCol>

  <h3>Contact Info</h3>
  <CRow>
  <CCol md={6}>
  <CFormLabel>Your email</CFormLabel>
    <CFormInput type="email" id="yourEmail" label="Email" 
    value={created_by_user_id}
    onChange={(e) =>setCreated_by_user_id(e.target.value)} />
  </CCol>

  <CCol md={6}>
  <CFormLabel>Customers email</CFormLabel>
    <CFormInput type="email" id="theirEmail" label="Email"
    value={contact_id}
    onChange={(e) =>setContact_id(e.target.value)} />
  </CCol>
  </CRow>

<p></p>


<h3>Invoice Details</h3>
<CRow className="justify-content-between">
  <CCol xs={3}>
  <CFormLabel>Issue Date</CFormLabel>
    <CFormInput type="date" id="date_issued" label="Issue Date"
    value={date_issued}
    onChange={(e) =>setDate_issued(e.target.valueAsDate)}
    />
  </CCol>

  <CCol sm={6}>
    <CFormLabel>Invoice Number</CFormLabel>
    <CFormInput type="text"
    value={invoice_id}
    onChange={(e) =>setInvoice_id(e.target.valueAsDate)}
    />
  </CCol>

  {/* <CCol md={6}>
    <CFormLabel>Reference / PO Number</CFormLabel>
    <CFormInput type="text"
    />
  </CCol> */}
  
  </CRow>

  <h3>Line Items</h3>

  {/* ITEMS */}
{/* <div id="item headers"> */}
    <CListGroup flush id="item headers">
            <CListGroupItem>
            <CRow className="justify-content-between">
            <CCol xs={3}>
            <CFormLabel>Item name</CFormLabel>
            </CCol>
            <CCol xs={2}>
            <CFormLabel>Price</CFormLabel>
            </CCol>
            <CCol xs={2}>
            <CFormLabel>Qty</CFormLabel>
            </CCol>
            <CCol xs={2}>
            <CFormLabel>Total</CFormLabel>
            </CCol>
            <CCol xs={3}></CCol>
            </CRow>
            </CListGroupItem>
            </CListGroup>

            {/* </div> */}
  {itemFields.map((form, index) => {
          return (
            //   <div key={index}>
                <CListGroup flush key={index}>
            <CListGroupItem>
                <CRow className="justify-content-between">
                <CCol xs={3}>
              {/* <CFormLabel>Item name</CFormLabel> */}
              <CFormInput
                name='name'
                placeholder='Name'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              </CCol>
              <CCol xs={2}>
              {/* <CFormLabel>Price</CFormLabel> */}
              <CFormInput 
                name='price'
                placeholder='0'
                onChange={event => handleFormChange(event, index)}
                value={form.price}
              />
              </CCol>
              
              <CCol xs={2}>
              {/* <CFormLabel>Qty</CFormLabel> */}
              <CFormInput
                name='quantity'
                placeholder='quantity'
                onChange={event => handleFormChange(event, index)}
                value={form.quantity}
              />
              </CCol>
              <CCol xs={2}>
              {/* <CFormLabel>Total</CFormLabel> */}
              <CFormInput
                name='total'
                placeholder='0.00'
                onChange={event => handleFormChange(event, index)}
                value={form.total}
                />
              </CCol>
              <CCol xs={3}>
            {/* <CFormLabel></CFormLabel> */}
              <CButton color="danger" variant="outline" size="sm" onClick={() => removeFields(index)}>Remove</CButton>
              </CCol>
              </CRow>
  </CListGroupItem>
            </CListGroup>
            // </div>
          )
        })}



<CCol>
      <CButton color="secondary" onClick={addFields}>Add More..</CButton>
</CCol>

<CCol md={6}>

  <CInputGroup className="mb-3">
  <CFormLabel className="col-sm-2 col-form-label">Total</CFormLabel>

  <CInputGroupText>$</CInputGroupText>
  <CFormInput
  type="number"
  placeholder="0.00"
//   aria-label="readonly input example"
  readOnly
    />
</CInputGroup>
  </CCol>



  {/* <CCol xs={12}>
    <CFormInput id="inputAddress2" label="Address 2" placeholder="Apartment, studio, or floor"/>
  </CCol> */}
  <CCol md={6}>
    <CFormInput id="paymentinstructions" label="paymentinstructions" 
    placeholder="Payment instructions..." />
  </CCol>
  <CCol md={4}>
    <CFormSelect id="frequency" label="frequency">
      <option>Frequency...</option>
      <option>...</option>
    </CFormSelect>
  </CCol>
  <CCol md={2}>
    <CFormInput id="inputZip" label="Zip" />
  </CCol>
  <CCol xs={12}>
    <CFormCheck type="checkbox" id="gridCheck" label="Send reminders"/>
  </CCol>
  <CCol xs={12}>
    
  </CCol>






</CForm>
</CContainer>
</div>
    );
}

export default NewInvoice;
