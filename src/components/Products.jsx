// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProduct } from "../store/ProductSlice";
// import { useNavigate } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';
// import { Grid, TextField } from "@mui/material";
// import { useTypewriter } from "react-simple-typewriter";
// import Footer from "./Footer";
// import { addCart } from "../store/AddToCartSlice";
// import Navbar from "./Navbar";

// const Products = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [productId, setProductId] = useState("");

//   const dispatch = useDispatch();
//   const { allProduct } = useSelector((state) => state.productReducer);

//   const filterProducts = allProduct?.data?.filter((product) => {
//     try {
//       if (productId !== "") {
//         return product.product_id.toString().includes(productId);
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await dispatch(fetchProduct());
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [dispatch]);

//   const [text] = useTypewriter({
//     words: ["o Product found"],
//     loop: {}
//   });

//   return (
//     <>
//     <Navbar/>
//       <div className="container my-2 pt-5">
//         <div className="row">
//           <div className="col-12">
//             <h1 className="display-6 fw-bolder text-center">Our Accessories</h1>
//           </div>
//         </div>
//         <hr />
//       </div>

//       <Grid container className="d-flex justify-content-center align-items-center py-3">
//         <Grid item xs={11}>
//           <TextField
//             label="Enter Accessories Id here..."
//             placeholder="Accessories Id"
//             variant="outlined"
//             onChange={(e) => setProductId(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//       </Grid>

//       <div className="container">
//         {isLoading ? (
//           <div className="d-flex justify-content-center">
//             <CircularProgress />
//           </div>
//         ) : (
//           <div className="row">
//             {filterProducts && filterProducts.length > 0 ? (
//               filterProducts.map((product) => (
//                 <div
//                   // onClick={() => navigate(`/productDetail/${product._id}`)}
//                   className="col-12 col-sm-6 col-md-3 mb-4"
//                   key={product._id}
//                 >
//                   <div className="card h-100 text-center p-2">
//                     <img
//                       src={product.image}
//                       className="card-img-top"
//                       height="250px"
//                       alt={product.title}
//                     />
//                     <div className="card-body">
//                       <h5 className="card-title mb-0">
//                         {product.title.substring(0, 12)}...
//                       </h5>
//                       <p className="card-text lead fw-bold">{product.sellPrice}€</p>
//                       {/* <a href="#" className="btn btn-outline-dark">
//                         Buy Now
//                       </a> */}
//                        <button
//                 className="btn btn-outline-dark px-4 py-2"
//                 onClick={() => {
//                   dispatch(addCart(product));
//                 }}
//               >
//                 {" "}
//                 Add To Cart{" "}
//               </button>
//               <button
//                 className="btn btn-dark ms-2 px-3 py-2"
//                 onClick={() => navigate("/cartpage")}
//               >
//                 {" "}
//                 Go To Cart{" "}
//               </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="d-flex justify-content-center w-100 fs-1 fw-bold py-3">
//                 N{text}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Products;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/ProductSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, TextField } from "@mui/material";
import { useTypewriter } from "react-simple-typewriter";
import Footer from "./Footer";
import { addCart } from "../store/AddToCartSlice";
import Navbar from "./Navbar";

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.productReducer);
  // console.log(allProduct,"allProduct");
  const filterProducts = allProduct?.data?.filter((product) => {
    try {
      if (productId !== "") {
        return product.product_id.toString().includes(productId);
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchProduct());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const [text] = useTypewriter({
    words: ["o Product found"],
    loop: {}
  });

  return (
    <>
      <Navbar />
      <div className="container my-2 pt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">Our Accessories</h1>
          </div>
        </div>
        <hr />
      </div>

      <Grid container className="d-flex justify-content-center align-items-center py-3">
        <Grid item xs={11}>
          <TextField
            label="Enter Accessories Id here..."
            placeholder="Accessories Id"
            variant="outlined"
            onChange={(e) => setProductId(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <div className="container">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            {filterProducts && filterProducts.length > 0 ? (
              filterProducts.map((product) => (
                <div
                  className="col-12 col-sm-6 col-md-3 mb-4"
                  key={product._id}
                >
                  <div className="card h-100 text-center p-2">
                    <img
                      src={product.image}
                      className="card-img-top"
                      height="250px"
                      alt={product.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-0">
                        {product.title.substring(0, 12)}...
                      </h5>
                      <p className="card-text lead fw-bold">{product.sellPrice}€</p>
                      <div className="d-flex justify-content-center align-item-center">

                        {product.stock !== 0 ? (
                          <>
                            <button
                              className="btn btn-outline-dark px-4 py-2"
                              onClick={() => {
                                dispatch(addCart(product));
                              }}
                            >
                              Add
                            </button>
                            <button
                              className="btn btn-dark ms-2 px-3 py-2"
                              onClick={() => navigate("/cartpage")}
                            >
                              Go To Cart
                            </button>
                          </>
                        ) : (
                          <>
                          <button
                              className="btn btn-outline-dark px-4 py-2"
                              onClick={() => {
                                dispatch(addCart(product));
                              }}
                              disabled
                            >
                              Add
                            </button>
                            <button
                              className="btn btn-dark ms-2 px-3 py-2"
                              onClick={() => navigate("/cartpage")}
                              disabled
                            >
                              Go To Cart
                            </button>
                          </>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex justify-content-center w-100 fs-1 fw-bold py-3">
                N{text}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;
