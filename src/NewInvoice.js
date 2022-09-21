import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CForm, CCol, CFormInput, CButton, CFormSelect, CFormCheck, CContainer, 
CInputGroup, CInputGroupText, CFormLabel, CRow, CListGroup, CListGroupItem, setVisible, visible, CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle, CTooltip, CLink} from '@coreui/react';


function NewInvoice() {


  const [apikey, setapikey] = useState("");
  const [providerid, setproviderid] = useState("");


  const [created_by_user_id, setCreated_by_user_id] = useState("");
  const [date_issued, setDate_issued] = useState();
  const [invoice_id, setInvoice_id] = useState("");
  const [contact_id, setContact_id] = useState("");
  const [payment_terms, setPayment_Terms] = useState("");
  const [payment_online_enabled, setPayment_online_enabled] = useState(Boolean);
  const [payment_instructions, setPayment_instructions] = useState("");
  const [billing_period_start, setBilling_period_start] = useState(new Date(Date.now));
  const [billing_period_end, setBilling_period_end] = useState(new Date(Date.now));
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
  
  // const [item, setItem] = useState(JSON);
  // const [itemName, setItemName] = useState("");
  // const [itemDescription, setDescription] = useState("");
  // const [itemPrice, setPrice] = useState(Number);
  // const [item_rate_type, setRate_type] = useState("");
  // const [item_tax_rate, setItem_tax_rate] = useState(Number);
  // const [item_quantity, setQuantity] = useState(Number);
  // const [itemTotal, setTotal] = useState(Number);
  // const [item_tags, setTags] = useState("");

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "api-key": "b5dcb16e99af272d8fbd01dd722201bf",
      "api-key": apikey,
      // "x-provider-id": "FPWir3NZZyW4MiYWJXN5",
      "x-provider-id": providerid,
      // "x-business-id": "6KYnUDZJy7SGHn2ga8Be"
      "x-business-id": "demobiz"
    }
  };
  
  const liveUrl = "https://api.slickco.io/invoices"

  // const theseLineItems = {
  //   "Item1": {
  //     "name": "string",
  //     "description": "string",
  //     "price": 0,
  //     "rate_type": "Hourly",
  //     "tax_rate": 0,
  //     "quantity": 0,
  //     "total": 0,
  //     "tags": [
  //       null
  //     ]
  //   },
  //   "Item2": {
  //     "name": "string",
  //     "description": "string",
  //     "price": 0,
  //     "rate_type": "Hourly",
  //     "tax_rate": 0,
  //     "quantity": 0,
  //     "total": 0,
  //     "tags": [
  //       null
  //     ]
  //   }
  // }

  const thesePaymentTerms = {
    "demoTerm": {
      "name": "Hello Terms",
      "description": "Why you need to pay by this day",
      "days": 30,
      "payment_due_date": "2019-08-24T14:15:22Z",
      "discount": 0,
      "penalty": 0
  }
}

  
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


  function updateTotals() {
    var subTotal = 0;
    
    // var sub_t = 0;
    // sub_t = itemFields.forEach(obj => {sub_t = sub_t + obj.price });

    // const thisTotal=(itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 ));
    
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

  const [clientDetails, setClientDetails] = useState(
    { 
      contact_id: ""
      , billing_name: ""
      , contact_name: ""
      , phone: ""
      , email: ""

    },
  )

  const handleClientChange = (event) => {
    let data = [clientDetails];
    data[event.target.name] = event.target.value;
    setClientDetails(data);

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
          // billing_period_start: billing_period_start,
          // billing_period_end: billing_period_end,
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
          
          <CCol md="auto" justify-content-end="true">


                {/* <CButton variant="outline" color="secondary" >get link</CButton> */}
                {/* <CButton type="submit" >send</CButton> */}
                <CButton onClick={() => setVisible(!visible)} >Send Invoice</CButton>
                
                </CCol>
          </CRow>
          <hr />
                <>
                {/* <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton> */}
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                  <CModalHeader>
                    <CModalTitle>Thanks for trying Slick!</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <p> We just need your APIKey and Provider ID to send this invoice </p>


                    <CFormInput type="text" id="apikey" label="API Key" 
                    value={apikey} onChange={(e)=>setapikey(e.target.value)} 
                    />

                    <CFormInput type="text" id="providerid" label="Provider ID" 
                    value={providerid} onChange={(e)=>setproviderid(e.target.value)} 
                    />

                  <p>Don't have either of these yet? Get in touch <CLink> api@slickco.io </CLink></p>

                  </CModalBody>

                  <CModalFooter className="justify-content-center">
                    {/* <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                    </CButton> */}
                    <CButton type="submit" onClick={(e) => handleSubmit(e)}>Send Invoice</CButton>
                  </CModalFooter>

                </CModal>
          </>



            <h3>Biller Contact Info</h3>
            <CRow className="justify-content-between">
                <CCol md={6}>
                    <CFormInput type="text" id="firstname" label="Contact Name" name='contact_name'
                     onChange={(e)=>handleClientChange(e)} 
                    />
                </CCol>
                <CCol md={6}>
                    <CFormInput type="text" id="lastname" label="Billing Name" name='billing_name'
                     onChange={(e)=>handleClientChange(e)} 
                    />
                </CCol>
            </CRow>
            <CRow className="justify-content-between">
                <CCol md={6}>
                    <CFormInput type="email" id="theirEmail" label="Client email" name="email" 
                    onChange={(e)=>handleClientChange(e)} />
                </CCol>

            </CRow>


            <CRow className="justify-content-between">
            <CCol md={6}>
            <CTooltip content="We'll use this to show who the invoice was sent from">
                    <CFormInput type="email" id="yourEmail" label="Your email" value={created_by_user_id} onChange={(e)=>setCreated_by_user_id(e.target.value)} />
                    </CTooltip>
                </CCol>
            </CRow>

            <hr />
            <h3>Invoice Details</h3>
            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormInput type="date" id="date_issued" label="Issue Date" 
                    // value={date_issued} 
                    onChange={(e)=>setDate_issued(e.target.value)} />
                </CCol>
            </CRow>
            
            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormInput type="text" value={invoice_id} label="Invoice Number" onChange={(e)=>setInvoice_id(e.target.value)} />
                </CCol>
                <CCol sm="3">
                    <CFormInput type="text" label="Reference / PO Number"/>
                </CCol>
            </CRow>

            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormSelect id="terms" label="Payment terms">
                        <option>Net 30</option>
                        <option>Same Day</option>
                    </CFormSelect>
                </CCol>
                <CCol sm="3">
                    <CFormInput type="date" id="dueDate" label="Due Date" />
                </CCol>
            </CRow>
            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormCheck type="checkbox" id="gridCheck" label="Send reminders" />
                </CCol>
            </CRow>
            <CRow className="justify-content-between">
                <CCol sm="3">
                    <CFormSelect id="frequency" label="Recurring Invoice" placeholder="Frequency">
                        <option></option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                    </CFormSelect>
                </CCol>
            </CRow>
            < hr/>

            
            <h3>Line Items</h3> 
            <CListGroup flush id="item headers">
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
                </CListGroup> 
                {itemFields.map((form, index) => { return (
                <CListGroup flush key={index}>
                    <CListGroupItem>
                        <CRow className="justify-content-between">
                            <CCol xs={4}> {/* <CFormLabel>Item name</CFormLabel> */} <CFormInput name='name' placeholder='Name' onChange={event=> handleFormChange(event, index)} value={form.name} /> </CCol>
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
            < hr/>
            <h3>Totals</h3>
            <CForm className="row gy-2 gx-3">
                <CRow className="justify-content-end">
                    <CCol md={6}>
                            <CFormLabel className="col-sm-2 col-form-label">
                                <h6>Sub Total</h6>
                            </CFormLabel>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>$</CInputGroupText>
                            { 
                              <CFormInput type="number" placeholder={itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 )} value={itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 )} readOnly />
                           
                          
                          }
                            
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CRow className="justify-content-end" >
                    <CCol md={6}>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label">Tax</CFormLabel>
                            <CFormInput type="text" placeholder="Eg. GST" /> 
                            </CInputGroup>
                            </CCol>
                            </CRow>
                <CRow className="justify-content-end" >
                    <CCol md={6}>
                      <CInputGroup>
                            <CFormLabel className="col-sm-2 col-form-label">Tax Rate</CFormLabel>
                            <CFormInput type="number" 
                            // value={tax_rate * 100} 
                            onChange={(e)=>updateTax(e)}/>
                            <CInputGroupText>%</CInputGroupText>
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CRow className="justify-content-end">
                    <CCol md={6}>
                            <CFormLabel className="col-sm-2 col-form-label">
                                <h5>Total</h5>
                            </CFormLabel>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>$</CInputGroupText>
                            <CFormInput type="number" value={ (itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 ) + itemFields.reduce((total,currentItem) =>  total = total + currentItem.total , 0 ) * tax_rate) } readOnly />
                        </CInputGroup>
                    </CCol>
                </CRow>
                </CForm>
            </CContainer>  
            <hr />
            <CContainer>
            <h3>Payment</h3>
            <CRow>
            <CCol md={6}>
              
                <CFormInput id="paymentinstructions" label="Payment Instructions" placeholder="How you would like to get paid..." />
            </CCol>
            </CRow>
            </CContainer>
        </CForm>
    </CContainer>
        {/* </form> */}
</div>
    );
}

export default NewInvoice;