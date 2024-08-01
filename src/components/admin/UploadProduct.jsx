import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Barcode from 'react-barcode';
import { toPng } from "html-to-image";
import download from "downloadjs";

const UploadProduct = () => {
  const [title, setTitle] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [stock, setStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleProductIdChange = (e) => {
    const value = e.target.value;
    if (value.length <= 13) {
      setProductId(value);
    }
  };

  const downloadBarcode = (e) => {
    e.preventDefault();
    const barcodeElement = document.getElementById("barcode");
    toPng(barcodeElement)
      .then((dataUrl) => {
        download(dataUrl, "barcode.png");
      })
      .catch((err) => {
        console.error("Failed to download barcode", err);
      });
  };

  const productUpload = async (event) => {
    event.preventDefault();
    if (title === "" || sellPrice === "" || purchasePrice === "" || stock === "") {
      notifyError();
    } else {
      let productData = {
        title,
        sellPrice,
        purchasePrice,
        product_id: productId,
        stock,
        description,
      };
      setIsLoading(true);
      try {
        await axios.post(`${BASE_URL}/Products`, productData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        notifySuccess();
        navigate('/adminPortal/UpdateProduct');
      } catch (error) {
        console.log(error);
        notifyError();
      } finally {
        setIsLoading(false);
        setSellPrice("");
        setPurchasePrice("");
        setProductId("");
        setTitle("");
        setStock("");
      }
    }
  };

  const notifySuccess = () => toast.success('🦄 Your Product has Uploaded!', {
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
      <h1 className="d-flex justify-content-center mb-3 text-primary fw-bold">
        Upload Product
      </h1>
      <Card
        style={{
          maxWidth: 450,
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
                  placeholder="Enter product title"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  value={productId}
                  type="text"
                  label="Product ID"
                  onChange={handleProductIdChange}
                  placeholder="Enter product ID"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <div id="barcode">
                  <Barcode value={productId} />
                </div>
              </Grid>
              <Grid xs={12} item style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" onClick={downloadBarcode}>
                  Download Barcode
                </Button>
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  value={stock}
                  type="number"
                  label="Stock"
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  value={sellPrice}
                  label="Sell Price"
                  type="number"
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder="Enter sell price"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  value={purchasePrice}
                  label="Purchase Price"
                  type="number"
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Enter purchase price"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" onClick={productUpload} disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
                </Button>
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

export default UploadProduct;
