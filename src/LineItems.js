import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CForm, CCol, CFormInput, CButton, CFormSelect, CFormCheck, CContainer, 
    CInputGroup, CInputGroupText, CFormLabel, CRow, CListGroup, CListGroupItem} from '@coreui/bootstrap-react';
    


function LineItems() {
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


    return (
        <div className="lineitems">
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
</div>
    )
}