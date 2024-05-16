import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signupValidation } from "./signUpValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const initialValues = {
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const navigate = useNavigate(); // Initialize useNavigate hook

  const formik = useFormik({
    initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      setFormSubmitted(true); // Set formSubmitted to true on submission

      try {
        console.log("API URL:", process.env.REACT_APP_API_URL);

        const response = await fetch(
          process.env.REACT_APP_API_URL + "/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Error registering user");
          console.error("Error registering user:", errorData);
          throw new Error(errorData.message || "Error registering user");
        }

        const data = await response.json();
        toast.success("Registration successful");
        console.log("Registration successful", data);
        navigate("/user/home"); // Use navigate to redirect to /user after successful registration
      } catch (error) {
        // toast.error(error.message || "Error registering user");
        // console.error("Error registering user:", error);
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
        <h3>Register</h3>
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
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={formik.values.cpassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.cpassword && formik.errors.cpassword && (
            <small className="error-message">{formik.errors.cpassword}</small>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        {/* Conditionally render success message only if form is submitted and no errors
        {formSubmitted && Object.keys(formik.errors).length === 0 && (
          <p className="success-message">Registration successful!</p>
        )} */}
      </form>
    </>
  );
};

export default Register;
