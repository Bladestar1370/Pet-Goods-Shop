// src/page/Login/LoginSignup.jsx
import React, { useState } from "react";
import "./LoginSignUp.css";  // Assuming filename is LoginSignUp.css – if lowercase, change to "./LoginSignup.css"
import { API_URL } from "../../config/api";  // Adjust path if config is elsewhere

export const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [error, setError] = useState(null);  // For showing errors in UI

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Server error – please try again");
      console.error("Login error:", err);
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Server error – please try again");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <>
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                name="mobile"
                value={formData.mobile}
                onChange={changeHandler}
                type="tel"
                placeholder="Mobile Number"
                required
              />
              <input
                name="address"
                value={formData.address}
                onChange={changeHandler}
                type="text"
                placeholder="Address"
                required
              />
            </>
          ) : null}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};