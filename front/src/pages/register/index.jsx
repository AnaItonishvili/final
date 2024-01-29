import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../redux/slices/uiSlice";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!isEmailValid(email)) {
      dispatch(showError("Please enter a valid email address"));
      return;
    }

    if (!isPasswordValid(password)) {
      dispatch(
        showError(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit"
        )
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email,
        password,
      });
      if (response.status === 201) {
        dispatch(showSuccess(response.data.message));
        navigate("/login");
      }
    } catch (error) {
      if (error) {
        dispatch(showError(error.response.data.error));
      }
    }
  };

  return (
    <section className="page login__wrapper">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            autoComplete="true"
            placeholder="Email address"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            autoComplete="true"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        <Link to={"/login"}>Login to your account</Link>
      </form>
    </section>
  );
}

export default Register;
