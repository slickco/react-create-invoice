import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

function ViewInvoice() {


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
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="invoice-title">
                            <h2>Invoice</h2><h3 className="pull-right">Order # 12345</h3>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs-6">
                                <address>
                                    <strong>Billed To:</strong><br />
                                    John Smith<br />
                                    1234 Main<br />
                                    Apt. 4B<br />
                                    Springfield, ST 54321
                                </address>
                            </div>
                            <div className="col-xs-6 text-right">
                                <address>
                                    <strong>Shipped To:</strong><br />
                                    Jane Smith<br />
                                    1234 Main<br />
                                    Apt. 4B<br />
                                    Springfield, ST 54321
                                </address>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <address>
                                    <strong>Payment Method:</strong><br />
                                    Visa ending **** 4242<br />

                                </address>
                            </div>
                            <div className="col-xs-6 text-right">
                                <address>
                                    <strong>Order Date:</strong><br />
                                    March 7, 2014<br /><br />
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong>Order summary</strong></h3>
                            </div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-condensed">
                                        <thead>
                                            <tr>
                                                <td><strong>Item</strong></td>
                                                <td className="text-center"><strong>Price</strong></td>
                                                <td className="text-center"><strong>Quantity</strong></td>
                                                <td className="text-right"><strong>Totals</strong></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>BS-200</td>
                                                <td className="text-center">$10.99</td>
                                                <td className="text-center">1</td>
                                                <td className="text-right">$10.99</td>
                                            </tr>
                                            <tr>
                                                <td>BS-400</td>
                                                <td className="text-center">$20.00</td>
                                                <td className="text-center">3</td>
                                                <td className="text-right">$60.00</td>
                                            </tr>
                                            <tr>
                                                <td>BS-1000</td>
                                                <td className="text-center">$600.00</td>
                                                <td className="text-center">1</td>
                                                <td className="text-right">$600.00</td>
                                            </tr>
                                            

                                            <tr>
                                                <td className="thick-line"></td>
                                                <td className="thick-line"></td>
                                                <td className="thick-line text-center"><strong>Subtotal</strong></td>
                                                <td className="thick-line text-right">$670.99</td>
                                            </tr>
                                            <tr>
                                                <td className="no-line"></td>
                                                <td className="no-line"></td>
                                                <td className="no-line text-center"><strong>Shipping</strong></td>
                                                <td className="no-line text-right">$15</td>
                                            </tr>
                                            <tr>
                                                <td className="no-line"></td>
                                                <td className="no-line"></td>
                                                <td className="no-line text-center"><strong>Total</strong></td>
                                                <td className="no-line text-right">$685.99</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong>Payment Details</strong></h3>
                            </div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-condensed">
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                

    );

}

export default ViewInvoice;