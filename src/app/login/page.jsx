"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik"; // Import useFormik hook for form handling
import * as yup from "yup"; // Import yup for form validation
import Link from "next/link";
import { StoreContext } from "../context/Context";
export default function LoginPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const { secretKey } = useContext(StoreContext);
  useEffect(() => {
    // Load user data from localStorage when the component mounts
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Define validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup
      .string()

      .email("Invalid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // Initialize Formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;

      // Check if there's a user with matching email and password
      const isExist = users.some(
        (user) => user.email === email && user.password === password
      );

      if (isExist) {
        const currentUser = users.find(
          (user) => user.email === email && user.password === password
        );
        localStorage.setItem("currentUser", JSON.stringify(currentUser.name));
        localStorage.setItem("userToken", secretKey);
        router.push("/home");
      } else {
        console.log("Invalid email or password");
        setErrorEmailMessage("Invalid email or password");
        // Handle invalid credentials here, e.g., show an error message
      }
    },
  });

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center   w-25 m-auto">
      <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-3 rounded-3">
        <h1 className=" header-form">Login</h1>
        {errorEmailMessage && (
          <div className="alert my-2 py-2 alert-danger">
            {errorEmailMessage}
          </div>
        )}
        <div className="pt-3">
          <form onSubmit={formik.handleSubmit}>
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

            <button type="submit" className="btn button-color w-100 mt-3">
              {"Login"}
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
            Already Have an Account? <Link href="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
