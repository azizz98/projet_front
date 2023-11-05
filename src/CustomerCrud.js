import axios from 'axios';
import './Dark.css';
import {useEffect, useState } from "react";

function CustomerCrud()
{
  const [customerid, setId] = useState('');
  const [customername, setName] = useState("");
  const [customeraddress, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [customers, setUsers] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);


  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8084/api/v1/customer/getAllCustomers");
         setUsers(result.data);
         console.log(result.data);
  }
 
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8084/api/v1/customer/newCustomer",
        {
          customername: customername,
          customeraddress: customeraddress,
          mobile: mobile
        });
          setId("");
          setName("");
          setAddress("");
          setMobile("");
          Load();
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }

   async function editCustomer(customers)
   {
    setName(customers.customername);
    setAddress(customers.customeraddress);
    setMobile(customers.mobile); 
    setId(customers.customerid);
   }

   async function deleteCustomer(customerid)
   {
        await axios.delete("http://localhost:8084/api/v1/customer/deleteCustomer/" + customerid); 
        Load();
   }

   async function update(event)
   {
    event.preventDefault();

   try
       {
        await axios.put("http://localhost:8084/api/v1/customer/updateCustomer/",
       {
        customerid: customerid,
        customername: customername,
        customeraddress: customeraddress,
         mobile: mobile
       
       });
         setId("");
         setName("");
         setAddress("");
         setMobile("");
         Load();
       }
   catch(err)
       {
         alert("User Registation Failed");
       }
  }
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-8 mt-[5rem] mb-[5rem]">
        <h1 className="text-3xl font-semibold mb-[3rem]">Customer Details</h1>
        <form className="">
  <div className="flex justify-center gap-6">
    <input
      type="text"
      id="customerid"
      hidden
      value={customerid}
      onChange={(event) => {
        setId(event.target.value);
      }}
    />
    <div>
      <label className="text-sm font-semibold mr-[1rem]">Customer Name:</label>
      <input
        type="text"
        id="customername"
        value={customername}
        onChange={(event) => {
          setName(event.target.value);
        }}
        className="form-input"
        style={{ background: '#111827', color: 'white' }}
      />
    </div>
    <div>
      <label className="text-sm font-semibold mr-[1rem]">Customer Address:</label>
      <input
        type="text"
        id="customeraddress"
        value={customeraddress}
        onChange={(event) => {
          setAddress(event.target.value);
        }}
        className="form-input"
        style={{ background: '#111827', color: 'white' }}
      />
    </div>
    <div>
      <label className="text-sm font-semibold mr-[1rem]">Mobile:</label>
      <input
        type="text"
        id="mobile"
        value={mobile}
        onChange={(event) => {
          setMobile(event.target.value);
        }}
        className="form-input"
        style={{ background: '#111827', color: 'white' }}
      />
    </div>
  </div>
  <div className="flex items-center justify-center mt-6 gap-[1rem]">
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      onClick={save}
    >
      Add Customer
    </button>
    <button
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
      onClick={update}
    >
      Update
    </button>
  </div>
</form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[3rem]">
          {customers.map(function fn(customer) {
            return (
              <div key={customer.customerid} className="card">
                <div className="card-header">Customer Id: {customer.customerid}</div>
                <div className="card-body">
                  <p className="card-text">Customer Name: {customer.customername}</p>
                  <p className="card-text">Customer Address: {customer.customeraddress}</p>
                  <p className="card-text">Customer Mobile: {customer.mobile}</p>
                </div>
                <div className="card-footer">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                    onClick={() => editCustomer(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => deleteCustomer(customer.customerid)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
            );
        }
 
export default CustomerCrud;