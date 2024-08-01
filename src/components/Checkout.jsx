// import axios from "axios";
// import { BASE_URL } from "../Api/api";
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { clearCart } from "../store/AddToCartSlice";
// import { CircularProgress } from "@mui/material";

// const Checkout = () => {
//   const [billData, setBillData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const notifySuccess = () => toast.success('🦄 Your Bill Print successfully!', {
//     position: "top-center",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });

//   const notifyError = () => toast.error('🦄 Something went wrong while printing the bill!', {
//     position: "top-center",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });

//   const getAccessories = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getAccessories`);
//       setBillData(response.data.data);
//       console.log(response.data); // Log the response data
//       console.log("billData", billData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const stockUpdate = async (bill) => {
//     setLoading(true); 
//     try {
//       const remainingStockData = [];

//       for (const item of bill.AccessoriesItems) {
//         const remainingStock = item.stock - item.quantity; // Calculate the new stock

//         // Update product stock
//         // await axios.put(`${BASE_URL}/updateProduct/${item.product_ID}`, {
//         //   stock: remainingStock
//         // });

//         console.log(`Updated stock for product ${item.product_ID}: ${remainingStock}`);

//         remainingStockData.push({
//           product_ID: item.product_ID,
//           remainingStock: remainingStock
//         });
//       }

//       const adminData = {
//         dataAdmin: billData,
//         remainingStock: remainingStockData
//       };

//       console.log("Admin data to be sent:", adminData);

//       // Send data to admin endpoint
//       const sendDataResponse = await axios.post(`${BASE_URL}/senddata`, adminData);
//       console.log("sendData response:", sendDataResponse.data);

//       // Delete bill
//       const deleteResponse = await axios.delete(`${BASE_URL}/deleteAccessories/${bill._id}`);
//       console.log("deleteAccessories response:", deleteResponse.data);

//       // notifySuccess();
//       alert('Your bill printed successfully');
//       dispatch(clearCart());
//       navigate('/');
//     } catch (error) {
//       console.log("Error occurred:", error.message);
//       notifyError();
//     }finally {
//       setLoading(false); // Stop loading indicator
//     }
//   };

//   useEffect(() => {
//     getAccessories();
//   }, []);

//   let subTotal = 0;
// let Amount = 0;
// let TotalItems = 0;
// let SaleQty = 0;
//   return (
//    <>
//     <div className=" mt-3" style={{height: "100vh"}}>
//       <div  style={{
//           maxWidth: 650,
//           margin: "0 auto",
//           padding: "20px",
//           border: "1px solid black",
//           backgroundColor: "rgba(255, 255, 255, 0.824)",
//           backdropFilter: "blur(10px)", // Apply blur to the background
//           borderRadius: "10px", // Add rounded corners for better aesthetics
//         }}>
//       <div className="text-center">
//       <h3 className="fw-bold">ME Car Accessories</h3>
//       <p >shop # U107/K-2, Beron Mughal Saray, Kashif Market, Rawalpindi.</p>
      
//       <span >Ph : <span className="fw-bold">021-3259850</span></span>
//       <span className="ms-4">E-mail:<span className="fw-bold"> emadalikhan5@gmail.com</span> </span>
  
//       </div>
//       <hr />
//       {billData.length !== 0 ? (
//   billData.map((bill, index) => (
//     <div key={index}>
//       <div className="d-flex justify-content-between align-items-center">
//         <p className="ms-4">
//           <span className="fw-bold">Customer Name :</span> <u>{bill.billerName}</u>
//         </p>
//         <p className="me-4">
//           <span className="fw-bold">Payment Type :</span> <u>Cash</u>
//         </p>
//       </div>
//       <div className="d-flex justify-content-between align-items-center">
//         <p className="ms-4">
//           <span className="fw-bold">Phone Number :</span> <u>0318-6342262</u>
//         </p>
//         <p className="me-4">
//           <span className="fw-bold">Bill Date :</span> <u>{new Date(bill.createdAt).toLocaleString().substring(0,9)}</u>
//         </p>
//       </div>
//     </div>
//   ))
// ) : (
//   <h1>No data available</h1>
// )}

//       <hr />
//       {billData.length !== 0 ? (
//         billData.map((bill, index) => (
//           <div key={index}>
//             <table className="table table-bordered">
//               <thead className="fw-bold">
//                 <tr>
//                   <td>S.No</td>
//                   <td>Product Name</td>
//                   <td>Quantity</td>
//                   <td>Rate</td>
//                   <td>Amount</td>
//                 </tr>
//               </thead>

//           <tbody>
//             <tr>
// <td>{index + 1}</td>

//            <td>
//            <ul className="list-unstyled">
//               {bill.AccessoriesItems.map((item, itemIndex) => {
//                 return (
//                   <li key={itemIndex}>
//                     <p>{item.title}</p>
//                   </li>
//                 );
//               })}
//             </ul>
//            </td>

//            <td>
//            <ul className="list-unstyled">
//               {bill.AccessoriesItems.map((item, itemIndex) => {
//                 Amount = item.sellPrice * item.quantity
//                 return (
//                   <li key={itemIndex}>
//                     <p> {item.quantity}</p>
//                   </li>
//                 );
//               })}
//             </ul>
//            </td>

//            <td>
//            <ul className="list-unstyled">
//               {bill.AccessoriesItems.map((item, itemIndex) => {
//                 return (
//                   <li key={itemIndex}>
//                     <p>{item.sellPrice}</p>
//                   </li>
//                 );
//               })}
//             </ul>
//            </td>
           
// <td>
//   {Amount}.00
// </td>

//             </tr>
//           </tbody>


//             </table>
//             <div className="d-flex justify-content-around align-item-center">
//               <p><span className="fw-bold">Total Items</span> : <u>{TotalItems += index + 1}</u></p>
//               <p><span className="fw-bold">Sale Qty</span> : <u>{bill.AccessoriesItems.map((item,index)=>{
//                 SaleQty += item.quantity
//                 return <span>{SaleQty}</span>
//               })}</u></p>
//               <p><span className="fw-bold">Sale Total</span> : <u>{bill.AccessoriesItems.map((item,index)=>{
//                 subTotal += item.sellPrice * item.quantity;
//                 return <span>{subTotal}.00</span>
//               })}</u></p>
//             </div>

//               <div className="d-flex justify-content-between align-item-center">
//               <div className="d-flex flex-row align-items-center">
//                 <p className="ms-5"><span className="fw-bold">Stamp</span> : </p>
//                 <span className="ms-1"> <textarea cols={20} rows={4}></textarea></span>
//               </div>
             
//                 <p className="me-5 mt-4"><span className="fw-bold fs-5">Invoice Total</span> : <u>{subTotal}.00</u></p>
              
             
//               </div>
//             {/* <p>Seller Name: {bill.sellerName}</p>
//             <p>Biller Name: {bill.billerName}</p>
//             <p>Biller_id: {bill._id}</p>
//             <p>Created At: {new Date(bill.createdAt).toLocaleString()}</p>
//             <h5>Accessories Items:</h5>
//             <ul className="list-unstyled">
//               {bill.AccessoriesItems.map((item, itemIndex) => {
//                 subTotal += item.sellPrice * item.quantity;
//                 return (
//                   <li key={itemIndex}>
//                     <p>Title: {item.title}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Price: {item.sellPrice}</p>
//                   </li>
//                 );
//               })}
//               <p>Total Amount: {subTotal}</p>
//             </ul>
            
//             <button
//               className="btn btn-outline-dark px-5"
//               onClick={() => stockUpdate(bill)}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : 'Print'}
//             </button>

//             <ToastContainer
//               position="top-center"
//               autoClose={5000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="light"
//             /> */}
//           </div>
//         ))
//       ) : (
//         <h1>No data available</h1>
//       )}
//       </div>
//     </div>


//     {
//         billData.length !==0 ? (
//           billData.map((bill,index)=>(
//             <div key={index} className="d-flex justify-content-center">
//                 <button
//               className="btn btn-outline-dark px-5"
//               onClick={() => stockUpdate(bill)}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : 'Print'}
//             </button>
//             </div>
//           ))
//         ) : (
//           <h1>No data available</h1>
//         )
//       }

//    </>
//   );
// };

// export default Checkout;

import axios from "axios";
import { BASE_URL } from "../Api/api";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from "../store/AddToCartSlice";
import { CircularProgress } from "@mui/material";

const Checkout = () => {
  const [billData, setBillData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const notifySuccess = () => toast.success('🦄 Your Bill Print successfully!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const notifyError = (error) => toast.error(error, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const getAccessories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAccessories`);
      setBillData(response.data.data);
      console.log(response.data); // Log the response data
      console.log("billData", billData);
    } catch (error) {
      console.log(error);
    }
  };

  const stockUpdate = async (bill) => {
    setLoading(true); 
    try {
      const remainingStockData = [];

      for (const item of bill.AccessoriesItems) {
        const remainingStock = item.stock - item.quantity; // Calculate the new stock

        // Update product stock
        // await axios.put(`${BASE_URL}/updateProduct/${item.product_ID}`, {
        //   stock: remainingStock
        // });

        console.log(`Updated stock for product ${item.product_ID}: ${remainingStock}`);

        remainingStockData.push({
          product_ID: item.product_ID,
          remainingStock: remainingStock
        });
      }

      const adminData = {
        dataAdmin: billData,
        remainingStock: remainingStockData
      };

      console.log("Admin data to be sent:", adminData);

      // Send data to admin endpoint
      const sendDataResponse = await axios.post(`${BASE_URL}/senddata`, adminData);
      console.log("sendData response:", sendDataResponse.data);

      // Delete bill
      const deleteResponse = await axios.delete(`${BASE_URL}/deleteAccessories/${bill._id}`);
      console.log("deleteAccessories response:", deleteResponse.data);

      // notifySuccess();
      alert('Your bill printed successfully');
      dispatch(clearCart());
      navigate('/');
    } catch (error) {
      console.log("Error occurred:", error.message);
      notifyError(error.message);
    }finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    getAccessories();
  }, []);

  // Calculate totals outside the rendering logic
  let totalItems = 0;
  let totalQty = 0;
  let subTotal = 0;

  if (billData.length > 0) {
    billData.forEach(bill => {
      bill.AccessoriesItems.forEach(item => {
        totalItems += 1;
        totalQty += item.quantity;
        subTotal += item.sellPrice * item.quantity;
      });
    });
  }

  return (
   <>
    <div className=" mt-3" style={{height: "100vh"}}>
      <div  style={{
          maxWidth: 650,
          margin: "0 auto",
          padding: "20px",
          border: "1px solid black",
          backgroundColor: "rgba(255, 255, 255, 0.824)",
          backdropFilter: "blur(10px)", // Apply blur to the background
          borderRadius: "10px", // Add rounded corners for better aesthetics
        }}>
      <div className="text-center">
      <h3 className="fw-bold">ME Car Accessories</h3>
      <p >shop # U107/K-2, Beron Mughal Saray, Kashif Market, Rawalpindi.</p>
      
      <span >Ph : <span className="fw-bold">021-3259850</span></span>
      <span className="ms-4">E-mail:<span className="fw-bold"> emadalikhan5@gmail.com</span> </span>
  
      </div>
      <hr />
      {billData.length !== 0 ? (
        billData.map((bill, index) => (
          <div key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <p className="ms-4">
                <span className="fw-bold">Customer Name :</span> <u>{bill.billerName}</u>
              </p>
              <p className="me-4">
                <span className="fw-bold">Payment Type :</span> <u>Cash</u>
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="ms-4">
                <span className="fw-bold">Phone Number :</span> <u>0318-6342262</u>
              </p>
              <p className="me-4">
                <span className="fw-bold">Bill Date :</span> <u>{new Date(bill.createdAt).toLocaleString().substring(0,9)}</u>
              </p>
            </div>
            <table className="table table-bordered">
              <thead className="fw-bold">
                <tr>
                  <td>S.No</td>
                  <td>Product Name</td>
                  <td>Quantity</td>
                  <td>Rate</td>
                  <td>Amount</td>
                </tr>
              </thead>
              <tbody>
                {bill.AccessoriesItems.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{itemIndex + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.sellPrice}</td>
                    <td>{item.sellPrice * item.quantity}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <h1>No data available</h1>
      )}

      <hr />
      {billData.length !== 0 ? (
        <div className="d-flex justify-content-around align-items-center">
          <p><span className="fw-bold">Total Items</span> : <u>{totalItems}</u></p>
          <p><span className="fw-bold">Sale Qty</span> : <u>{totalQty}</u></p>
          <p><span className="fw-bold">Sale Total</span> : <u>{subTotal}.00</u></p>
        </div>
      ) : null}

      {billData.length !== 0 && billData.map((bill, index) => (
        <div key={index} className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <p className="ms-5"><span className="fw-bold">Stamp</span> : </p>
            <span className="ms-1"> <textarea cols={20} rows={4}></textarea></span>
          </div>
          <p className="me-5 mt-4"><span className="fw-bold fs-5">Invoice Total</span> : <u>{subTotal}.00</u></p>
        </div>
      ))}

      <div className="d-flex justify-content-center mt-4">
        {billData.length !== 0 && billData.map((bill, index) => (
          <button key={index} className="btn btn-outline-dark px-5" onClick={() => stockUpdate(bill)}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Print'}
          </button>
        ))}
      </div>
      </div>
    </div>
   </>
  );
};

export default Checkout;
