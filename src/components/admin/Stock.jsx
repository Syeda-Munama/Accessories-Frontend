import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useTypewriter } from "react-simple-typewriter";
import { fetchProduct } from "../../store/ProductSlice";

const Stock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.productReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchProduct());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const [text] = useTypewriter({
    words: ["No Product found"],
    loop: {}
  });

  return (
    <>
      <div className="container my-2 pt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">Our Remaining Stock</h1>
          </div>
        </div>
        <hr />
      </div>

      {isLoading ? (
        <div className="text-center my-5">
          <CircularProgress />
        </div>
      ) : allProduct.length === 0 ? (
        <h2 className="text-center my-5">{text}</h2>
      ) : (
        <div className="container">
          <div className="row">
            {allProduct.data.map((item, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="card h-100 text-center p-3">
                  <p>Category: <span className="fw-bold">{item.category}</span></p>
                  <p>Title: <span className="fw-bold">{item.title}</span></p>
                  <p>Stock: <span className="fw-bold">{item.stock}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Stock;
