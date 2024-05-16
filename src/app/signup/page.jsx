"use client"; // Indicate a client component

import { useRouter } from "next/navigation"; // Use next/router for navigation
import { useState, useEffect, useContext } from "react"; // Import useState and useEffect hooks
import { useFormik } from "formik"; // Import useFormik hook for form handling
import * as yup from "yup"; // Import yup for form validation
import Link from "next/link";
import jwt from "jsonwebtoken";
import { StoreContext } from "../context/Context";
export default function SignupPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]); // Initialize users state to store existing users
  const [errorMessage, setErrorMessage] = useState("");
  let passwordRegex = /^[A-Z][a-zA-Z0-9]{7,}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { secretKey } = useContext(StoreContext);
  useEffect(() => {
    // Load existing users from localStorage when component mounts
    const existingUsers = localStorage.getItem("users");
    if (existingUsers) {
      setUsers(JSON.parse(existingUsers));
    }
  }, []);

  // Define validation schema using Yup
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .matches(emailRegex, "Invalid Format")
      .email("Invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      // .matches(passwordRegex, "Must be 8 or more characters.")
      .required("Password is required"),
  });

  // Initialize Formik form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { name, email, password } = values;
      const user = { name, email, password };
      const isExist = users.some((user) => user.email === email);

      if (isExist) {
        // If the email already exists, display an error message

        setErrorMessage("Email already exists!!");
        setSubmitting(false); // Set submitting to false to allow resubmission
      } else {
        // If the email is unique, proceed with signup
        setUsers((prevUsers) => [...prevUsers, user]);
        localStorage.setItem("users", JSON.stringify([...users, user]));
        // localStorage.setItem("userToken", JSON.stringify(email));
        localStorage.setItem("userToken", secretKey);
        router.push("/home");
      }
    },
  });

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center   w-25 m-auto">
      <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-3 rounded-3">
        <h3 className="fw-bold header-form">Sign Up</h3>

        {errorMessage && (
          <div className="alert my-2 py-2 alert-danger">{errorMessage}</div>
        )}
        <div className="pt-3">
          <form onSubmit={formik.handleSubmit}>
            <label
              className=""
              style={{
                fontFamily: "Rubik",
                fontSize: "14px",
              }}
            >
              Name
            </label>
            <input
              className="form-control my-2"
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className=" alert my-2 py-2 alert-danger">
                {formik.errors.name}
              </div>
            ) : null}
            <label>Email</label>
            <input
              className="form-control my-2"
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="alert my-2 py-2 alert-danger">
                {formik.errors.email}
              </div>
            ) : null}
            <label>Password</label>
            <input
              className="form-control my-2"
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="alert my-2 py-2 alert-danger">
                {formik.errors.password}
              </div>
            ) : null}

            <button
              type="submit"
              className="btn button-color  text-light w-100 rounded-2 mt-2"
            >
              Sign Up
            </button>
          </form>
          <div className="d-flex mt-3 ">
            {" "}
            <div className="  line my-2"></div>
            <div
              style={{
                fontSize: "14px",
                lineHeight: " 24px",
                color: "rgba(152, 162, 179, 1)",
              }}
            >
              <p>OR</p>
            </div>
            <div className=" line my-2"></div>
          </div>
          <p
            style={{
              fontFamily: "Rubik",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: " 20px",
              textAlign: "center",
            }}
          >
            Already Have an Account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
