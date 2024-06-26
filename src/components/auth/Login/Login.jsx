import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidation } from "./loginValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../auth.css";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      setFormSubmitted(true);

      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Login failed");
          console.error("Error logging in:", data);
          return;
        }

        const { token, user } = data;

        // Store token and user details in localStorage or sessionStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Check account type and company name
        switch (user.accountType) {
          case "admin":
            if (user.company) {
              // Fetch bus details
              const busResponse = await fetch(
                process.env.REACT_APP_API_URL + "/buses"
              );
              const busData = await busResponse.json();
              // Check if the admin's company matches any bus company name
              const companyExists = busData.some(
                (bus) => bus.company === user.company
              );
              if (!companyExists) {
                navigate("/register");
              } else {
                navigate("/admin/home");
              }
            } else {
              navigate("/register");
            }
            break;
          case "user":
            navigate("/user/home");
            break;
          case "sysAdmin":
            navigate("/sysadmin/home");
            break;
          default:
            navigate("/auth"); // Default route for unknown account types
            break;
        }
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
      </form>
    </>
  );
};

export default Login;
