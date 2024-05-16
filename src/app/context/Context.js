"use client";
import { useRouter } from "next/navigation";

import { createContext, useEffect, useState } from "react";
export let StoreContext = createContext(0);
export default function StoreContextProvider({ children }) {
  const router = useRouter();
  //state el htkon shared 3la project kolo ex. counter children leha access 3la el counter
  let [counter, setCounter] = useState(0);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [users, setUsers] = useState([]);

  const crypto = require("crypto");

  const secretKey = crypto.randomBytes(32).toString("hex");
  console.log(secretKey);
  /************************for make sure that user already login or not by using token if token in local storage go to home if not go to login******** */
  useEffect(() => {
    // Load user data from localStorage when the component mounts
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Check if user is authenticated
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      // Redirect to login page if user is not authenticated
      if (router.pathname == "/home" || router.pathname == "/signup") {
        router.push("/login");
      }
    } else {
      // Redirect to home page if user is authenticated
      if (router.pathname == "/login" || router.pathname == "/signup") {
        router.push("/home");
      }
    }
  }, []);

  const [editProductId, setEditProductId] = useState(null); // Track the ID of the product being edited
  const handleAddProduct = () => {
    const { name, price, quantity } = formData;
    if (name && price && quantity) {
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9), // Generate unique ID
        name,
        price,
        quantity,
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setFormData({ name: "", price: "", quantity: "" }); // Clear form fields
      saveProductsToLocalStorage(updatedProducts); // Save updated products to local storage
    }
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts); // Save updated products to local storage
  };
  //handel edit product whed click on edit button
  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price,
        quantity: productToEdit.quantity,
      });
      setEditProductId(productId);
    }
  };
  // Function to update product
  const updateProduct = () => {
    const updatedProducts = products.map((product) => {
      if (product.id === editProductId) {
        return { ...product, ...formData };
      }
      return product;
    });
    setProducts(updatedProducts);
    setFormData({ name: "", price: "", quantity: "" });
    setEditProductId(null);
    saveProductsToLocalStorage(updatedProducts);
  };

  // Function to load products from local storage
  const loadProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };
  // Function to save products to local storage
  const saveProductsToLocalStorage = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <StoreContext.Provider
      value={{
        counter,
        setCounter,
        handleAddProduct,
        handleDeleteProduct,
        products,
        setProducts,
        formData,
        setFormData,
        loadProductsFromLocalStorage,
        handleChange,
        handleEditProduct,
        updateProduct,
        editProductId,
        setEditProductId,
        users,
        setUsers,
        secretKey,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
