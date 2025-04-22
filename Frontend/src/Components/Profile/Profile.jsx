import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/getuser", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await response.json();
        if (data.success) {
          setUserData(data.data);
        } else {
          alert(data.error);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Server error");
        navigate("/login");
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/getorders", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.data);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Server error");
      }
    };

    if (localStorage.getItem("auth-token")) {
      fetchUserData();
      fetchOrders();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {userData ? (
        <div className="profile-info">
          <h2>Personal Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Mobile:</strong> {userData.mobile}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <div className="order-history">
        <h2>Order History</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              </div>
              <div className="order-card-items">
                <p>Items:</p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.productId}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="order-card-shipping">
                <i className="fa-solid fa-truck"></i>
                <p>
                  <strong>Shipping:</strong> {order.shipping.name}, {order.shipping.address}, {order.shipping.city}, {order.shipping.country}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;