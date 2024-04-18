import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { loginValidation } from "./loginValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../auth.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      setFormSubmitted(true); // Set formSubmitted to true on submission

      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST", // Changed method to POST for login
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Login failed");
          console.error("Error logging in:", errorData);
          throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        navigate("/user");
        // Handle successful login data if needed (e.g., navigate to a different page)
      } catch (error) {
        toast.error(error.message || "Login failed");
        console.error("Error logging in:", error);
      }
    },
  });

  useEffect(() => {
    if (formSubmitted && Object.keys(formik.errors).length === 0) {
      // Send data to server only if form is submitted and no validation errors
      // ... (your server interaction logic)
    }
  }, [formSubmitted, formik.errors]);

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <h3>Login</h3>
        <div className="mb-3 m-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="error-message">{formik.errors.email}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <small className="error-message">{formik.errors.password}</small>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        {/* Conditionally render success message only if form is submitted and no errors
        {formSubmitted && Object.keys(formik.errors).length === 0 && (
          <p className="success-message">Login successful!</p>
        )} */}
      </form>
    </>
  );
};

export default Login;
