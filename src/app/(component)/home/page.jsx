"use client";
import { StoreContext } from "@/app/context/Context";
import React, { useContext, useEffect } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin
import { FaDownload } from "react-icons/fa";
import { GrDocumentCsv } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa6";
export default function MainPage() {
  const {
    handleAddProduct,
    products,
    formData,
    loadProductsFromLocalStorage,
    handleChange,
    handleDeleteProduct,
    handleEditProduct,
    updateProduct,
    editProductId,
  } = useContext(StoreContext);

  useEffect(() => {
    loadProductsFromLocalStorage();
  }, []); // Load products when component mounts

  const handleDownloadCSV = () => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(products); // Use products directly
    download(csvConfig)(csv);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Product List", 10, 10);
    // Generate the table from products data
    doc.autoTable({
      head: [["Name", "Price", "Quantity"]],
      body: products.map((product) => [
        product.name,
        product.price,
        product.quantity,
      ]),
    });
    doc.save("products.pdf");
  };

  const handleButtonClick = () => {
    if (editProductId) {
      updateProduct();
    } else {
      handleAddProduct();
    }
  };

  return (
    <div>
      <div className="container">
        <form className="row header-table-font border-bottom py-4">
          <div className="col-md-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
            />
          </div>
          <div className="col-md-3">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>
          <div className="col-md-3">
            <label>Quantity</label>
            <input
              type="text"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </div>
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <button
              className="btn button-color w-100 mt-3 p-2 text-white"
              type="button"
              onClick={handleButtonClick}
            >
              {editProductId ? "Update" : "Add"}
            </button>
          </div>
          <div className="col-md-1 d-flex">
            <button
              className="btn button-color fs-3 mt-1  text-white"
              onClick={handleDownloadCSV}
            >
              <GrDocumentCsv />
            </button>
            <button
              className="btn button-color fs-3  mt-1 mx-2 text-white"
              onClick={handleDownloadPDF}
            >
              <FaRegFilePdf />
            </button>
          </div>
        </form>
        <div className="row">
          <div className="col-12 mt-5">
            <table className="table" id="productTable">
              <thead>
                <tr className="header-table-font">
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="text-table-font">
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td className="d-flex">
                      <div className="">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="mx-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
