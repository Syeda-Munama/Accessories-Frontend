import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../../store/ProductSlice";
import { BASE_URL } from "../../Api/api";
import axios from "axios";

const UpdateProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const filterPrducts = allProduct?.data?.filter((product) => {
    try {
      if (selectedCategory === "All") {
        return true;
      } else {
        return product.category.includes(selectedCategory);
      }
    } catch (error) {
      console.log(error);
      return false; // Handle the error by returning false or handle it accordingly
    }
  });

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteProduct/${productId}`);
      console.log(response.data);
      dispatch(fetchProduct()); // Fetch products again to update the list after deletion
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center text-primary">Update Accessories</h1>
          </div>
        </div>
        <hr />
      </div>

      <div className="row">
        {filterPrducts?.map((product) => (
          <div className="col-12 col-sm-6 col-md-3 mb-4" key={product._id}>
            <div className="card h-100 text-center p-4">
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
                <p className="card-text lead fw-bold">{product.sellPrice}$</p>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    setId(product._id);
                    console.log(product._id);
                    navigate("/adminPortal/updateForm", { state: { id: product._id } });
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger ms-1 mt-1 "
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateProduct;
