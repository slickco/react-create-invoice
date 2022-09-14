import "./App.css";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert } from '@coreui/bootstrap-react';


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


function App() {
  const [created_by_user_id, setCreated_by_user_id] = useState("");
  const [date_issued, setDate_issued] = useState(Date);
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


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(liveUrl, {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
          created_by_user_id: created_by_user_id,
          date_issued: Date(date_issued),
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
        setDate_issued(Date);
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={created_by_user_id}
          placeholder="Your Email"
          onChange={(e) => setCreated_by_user_id(e.target.value)}
        />
        <input
          type="date"
          value={date_issued}
          placeholder="date issued"
          onChange={(e) => setDate_issued(e.target.value)}
        />
        <input
          type="text"
          value={invoice_id}
          placeholder="Invoice Number"
          onChange={(e) => setInvoice_id(e.target.value)}
        />
        <input
          type="email"
          value={contact_id}
          placeholder="Customer email"
          onChange={(e) => setContact_id(e.target.value)}
        />

        {/* <fieldset> */}
          <label><p>Items</p></label>
          
          <input
          type="text"
          value={itemName}
          placeholder="item name"
          onChange={(e) => setItemName(e.target.value)}
        />
          <input
          type="text"
          value={itemDescription}
          placeholder="item description"
          onChange={(e) => setDescription(e.target.value)}
        />
          
        <label><p>price</p> </label>
          <input
          type="number"
          value={itemPrice}
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
         
         <label><p>quantity</p> </label>
          <input
          type="number"
          value={item_quantity}
          placeholder="price"
          onChange={(e) => setQuantity(e.target.value)}
        />
          <label><p>total</p> </label>
          <input
          type="number"
          value={itemTotal}
          placeholder="price"
          onChange={(e) => setTotal(e.target.value)}
        />
          
        {/* </fieldset> */}

        <label><p>Enable Online payments?</p> 
        <input
          type="checkbox"
          value={payment_online_enabled}
          placeholder="online payments enabled"
          onChange={(e) => setPayment_online_enabled(e.target.value)}
        />
        </label>

        <input
          type="number"
          value={tax_rate}
          placeholder="tax rate"
          onChange={(e) => setTax_rate(e.target.value)}
        />

        <input
          type="number"
          value={total_due}
          placeholder="total due"
          onChange={(e) => setTotal_due(e.target.value)}
        />
        
        <input
          type="number"
          value={deposit_amount}
          placeholder="deposit amount"
          onChange={(e) => setDeposit_amount(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
