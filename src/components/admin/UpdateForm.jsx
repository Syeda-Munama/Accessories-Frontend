
import Autocomplete from "@mui/joy/Autocomplete";
import { Card, CardContent, CircularProgress, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../Api/api";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = () => {
  const [title, setTitle] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [productId, setProductId] = useState("");
  const [stock, setStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const id = location?.state?.id;

  const productUpdate = async (e) => {
    e.preventDefault();
    if (sellPrice === "" || title === "" || purchasePrice === "" || productId === "") {
      notifyError();
    } else {
      setIsLoading(true);
      try {
        const response = await axios.put(`${BASE_URL}/updateProduct/${id}`, {
          purchasePrice,
          title,
          sellPrice, // Changed from sellprice to sellPrice
          productId,
          stock
        });
        console.log(response.data);
        notifySuccess();
      } catch (error) {
        console.log("error", error);
        notifyError()
      } finally {
        setIsLoading(false);
        setPurchasePrice("");
        setProductId("");
        setSellPrice("");
        setTitle("");
        setStock("")
      }
    }
  };

  const notifySuccess = () => toast.success('🦄 Your Product has Updated!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const notifyError = () => toast.error('🦄 Fill all the fields!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  return (
    <div>
      <h1 className="d-flex justify-content-center text-primary fw-bold">Update Form</h1>
      <Card
        style={{
          maxWidth: 450,
          maxHeight: 470,
          margin: "0 auto",
          padding: "10px 5px",
          border: "1px solid black",
        }}
      >
        <CardContent>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  required
                  value={title}
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter updated productTitle"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  value={productId}
                  label="ProductId"
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Enter updated productId"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  value={stock}
                  label="stock"
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter updated stock"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  value={purchasePrice}
                  type="number"
                  label="PurchasePrice"
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Enter updated purchasePrice"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  value={sellPrice}
                  type="number"
                  label="SellPrice"
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder="Enter updated sellPrice"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid
                xs={12}
                marginTop={1}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="btn btn-primary px-5" onClick={productUpdate} disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update"}
                </button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
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
  );
};

export default UpdateForm;
