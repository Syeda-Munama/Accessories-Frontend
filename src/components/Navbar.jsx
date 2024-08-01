import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const Navbar = () => {
  const { addToCart } = useSelector((state) => state.addToCartReducer);
  const navigate = useNavigate();

  const [text] = useTypewriter({
    words: ["Accessories Store"],
    loop: {}
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top w-100">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            ME {text}
            <span className="text-danger"><Cursor /></span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex align-items-center">
              <button
                className="btn btn-outline-dark ms-2"
                onClick={() => navigate("/admin")}
              >
                <i className="fa fa-user-plus me-1"></i>
                Admin
              </button>
              <button
                className="btn btn-outline-dark ms-2"
                onClick={() => navigate("/cartpage")}
              >
                <i className="fa fa-shopping-cart me-1"></i>
                Cart({addToCart.length})
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
