import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Api/api";
import axios from "axios";

const OrderedPlaced = () => {
  const [Order, setAllOrder] = useState([]);

  const getAccessories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getdata`);
      setAllOrder(response.data.data);
      console.log(response.data.data); // Log the response data
      console.log("billData", Order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessories()
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      const respone = await axios.delete(`${BASE_URL}/deletedata/${orderId}`)
      console.log(respone.data);
      getAccessories()
    } catch (error) {
      console.log("error", error);
    }
  }


  return (
    <>

      <div>
        <h2 className="fw-bolder mb-4 mt-3">
          Total No. Of Accessories Sell : {Order?.length}{" "}
        </h2>
        <table className="table table-striped">
          <thead >
            <tr>
              <th>S.No</th>
              <th>Seller Name</th>
              <th>Selling Time</th>
              <th>Accessories Name</th>
              <th>Sell Quantity</th>
              <th>Remaining Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          {Order?.map((e, i) => (
            <tbody key={i}>
              {
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <td>
                      {e.dataAdmin.map((item, index) => (
                        <p>
                          {item.sellerName}
                        </p>

                      ))}
                    </td>
                  </td>
                  <td>
                      {e.dataAdmin.map((item, index) => (
                        <p>
                          {new Date(item.createdAt).toLocaleString()}
                        </p>

                      ))}
                    </td>

                  <td>   {e.dataAdmin.map((item, index) => (
                    <>
                      {item.AccessoriesItems.map((e, i) => (
                        <p> {e.title}</p>
                      ))}
                    </>
                  ))}</td>
                  <td>   {e.dataAdmin.map((item, index) => (
                    <>
                      {item.AccessoriesItems.map((e, i) => (
                        <p> {e.quantity}</p>
                      ))}
                    </>
                  ))}</td>
                  <td>
                      {e.remainingStock.map((item,index)=>(
                        <>
                       <p> {item.remainingStock}</p>
                        </>
                      ))  }
                    
                  </td>

                  
                  <td>
                    <button className="btn btn-danger text-black " onClick={() => deleteOrder(e._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default OrderedPlaced;
