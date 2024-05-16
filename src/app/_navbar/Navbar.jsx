"use client";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("userToken");
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href="#">
            SPACEJAT
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  hello{" "}
                  {isLoggedIn &&
                    JSON.parse(localStorage.getItem("currentUser"))}
                </a>
                <ul class="dropdown-menu">
                  {isLoggedIn ? (
                    <li>
                      <button className="dropdown-item" onClick={handleLogOut}>
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link className="dropdown-item" href="/login">
                        Login
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link class="dropdown-item" href="/signup">
                      signUp
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
