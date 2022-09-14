import { useState } from 'react';
import './App.css';

function AddRemove() {
  const [itemFields, setitemFields] = useState([
    { name: '', price: 0 , quantity: 0, total: 0 },
  ])

  const handleFormChange = (event, index) => {
    let data = [...itemFields];
    data[index][event.target.name] = event.target.value;
    setitemFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(itemFields)
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
    <div className="AddRemove">
      <form onSubmit={submit}>
        {itemFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Name'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              <input
                name='price'
                placeholder='0'
                onChange={event => handleFormChange(event, index)}
                value={form.price}
              />
              <input
                name='quantity'
                placeholder='quantity'
                onChange={event => handleFormChange(event, index)}
                value={form.quantity}
              />
              <input
                name='total'
                placeholder='0.00'
                onChange={event => handleFormChange(event, index)}
                value={form.total}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      <button onClick={addFields}>Add More..</button>
      </form>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default AddRemove;