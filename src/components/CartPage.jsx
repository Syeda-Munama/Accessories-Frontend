import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartDecrement, cartIncrement, removeAddToCart } from '../store/AddToCartSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTypewriter } from 'react-simple-typewriter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../Api/api';
import { CardContent, CircularProgress, Grid, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';

const CartPage = () => {
  const navigate = useNavigate();
  const [billerName, setBillerName] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const { addToCart } = useSelector((state) => state.addToCartReducer);
  const dispatch = useDispatch();
  const [text] = useTypewriter({
    words: ["Your Cart is Empty", "You have to Add Some Products to your Cart"],
    loop: true
  });
  const [loading, setLoading] = useState(false); // State for loading indicator

  const notifySuccess = () => toast.success('🦄 Your order has been sent!', {
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

  const checkoutProduct = async () => {
    if (!sellerName || !billerName ||!phoneNo ||!paymentType) {
      notifyError("Fill All the fields");
    } else {
      setLoading(true); // Start loading indicator

      const billData = {
        sellerName,
        billerName,
        paymentType,
        phoneNo,
        AccessoriesItems: addToCart.map((item) => ({
          quantity: item.count,
          title: item.title,
          sellPrice: item.sellPrice,
          stock: item.stock,
          product_ID: item._id
        }))
      };

      try {
        

        // Update stock for each product in addToCart
        for (const item of addToCart) {
          const remainingStock = item.stock - item.count;
          await axios.put(`${BASE_URL}/updateProduct/${item._id}`, { stock: remainingStock });
          console.log(`Updated stock for product ${item._id}: ${remainingStock}`);
        }

// Send accessories data to backend
const response = await axios.post(`${BASE_URL}/sendAccessories`, billData);
console.log("Response from sendAccessories:", response.data);

        // Notify success and navigate to checkout page
        notifySuccess();
        navigate('/checkout');
      } catch (error) {
        console.error("Error during checkout:", error.message);
        notifyError(error.message)
        // Handle error notification here if needed
      } finally {
        setLoading(false); // Stop loading indicator
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid my-5">
        <div className='d-flex justify-content-center align-item-center mb-3'>
          <h1 className='fw-bold '>Selling Products</h1>
        </div>
        <div className="row">
          {addToCart.length !== 0 ?
            addToCart.map((product, index) => (
              <div className="col-12 col-md-4 mb-4 border" key={index}>
                <div className="card h-100 border-0 text-center p-3">
                  <p>Product Category: <span className='fs-5 fw-bold'>{product?.category}</span></p>
                  <p>Product Name: <span className='fs-5 fw-bold'>{product?.title}</span></p>
                  <p>Product Price: <span className='fs-5 fw-bold'>{product?.sellPrice}</span>€</p>
                  <p>Product Stock: <span className='fs-5 fw-bold'>{product?.stock}</span></p>
                  {/* <p>Product_ID: <span className='fs-5 fw-bold'>{product?._id}</span></p> */}
                  <div>
                    <span>Product Quantity: </span>
                    <button
                      className='px-1 border-0 bg-dark text-white'
                      onClick={() => {
                        product.count > 1 ? dispatch(cartDecrement(product._id)) : dispatch(removeAddToCart(product._id))
                      }}
                    >
                      -
                    </button>
                    <span className='ps-2 fs-5'>{product.count} </span>
                    {product.count < product?.stock ? (
                      <button
                        className='ms-1 px-1 border-0 bg-dark text-white'
                        onClick={() => dispatch(cartIncrement(product._id))}
                      >
                        +
                      </button>
                    ) : (
                      <button className='ms-1 px-1 border-0 bg-secondary text-white' disabled>
                        +
                      </button>
                    )}
                  </div>
                  <h4 className="fw-bold my-4">
                    Total Price: {product?.sellPrice * product.count}€
                  </h4>
                </div>
              </div>
            ))
            : <h1 className='d-flex justify-content-center align-items-center' style={{ color: "grey", margin: "80px 0px 80px 0px" }}>Your Cart is Empty</h1>
          }
        </div>

        {addToCart.length !== 0 &&
          <div className='container mt-2'>
            <Card
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px",
          border: "1px solid black",
        }}
      >
        <CardContent>
        <h1 className="d-flex justify-content-center mb-3 fw-bold">Customer Detail</h1>
          <form>
            <Grid container spacing={2}>
              <Grid xs={3} item>
                <TextField
                  required
                  label="Customer Name"
                  onChange={(e) => setBillerName(e.target.value)}
                  placeholder="Enter Biller Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={3} item>
                <TextField
                  required
                  label="Seller Name"
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="Enter Seller Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={3} item>
                <TextField
                  required
                  label="Phone No"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="Enter Customer No"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={3} item>
                <TextField
                  required
                  label="Payment Type"
                  onChange={(e) => setPaymentType(e.target.value)}
                  placeholder="Enter Payment Type"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* <Grid
                xs={12}
                marginTop={2}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="btn btn-dark px-5" type="submit">
                  Submit
                </button>
              </Grid> */}
            </Grid>
          </form>
        </CardContent>
      </Card>
          </div>
        }

        {addToCart.length !== 0 &&
          <div className='d-flex justify-content-center align-items-center mt-4'>
            <button className='btn btn-outline-dark px-4 py-2 fw-bold' onClick={checkoutProduct} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Checkout'}
            </button>
          </div>
        }

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
