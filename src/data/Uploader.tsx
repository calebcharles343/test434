import { useState } from "react";
import { ProductType } from "../interfaces";
import { products } from "./products.js"; // Importing products from the JavaScript file
import { useCreateProduct } from "../features/product/useCreateProduct.js";
import SpinnerMini from "../ui/SpinnerMini.js";

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const { createProduct, isError, errorMessage, isPending } =
    useCreateProduct();

  async function uploadProducts() {
    setIsLoading(true);
    for (const product of products) {
      try {
        await createProduct(product as Partial<ProductType>);
      } catch (error) {
        console.error("Error uploading product:", error);
      }
    }
    setIsLoading(false);
  }

  // async function clearProducts() {
  //   setIsLoading(true);
  //   // Add logic to delete products if required
  //   console.log("Function to clear products goes here.");
  //   setIsLoading(false);
  // }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3 className="text-gray-700">PRODUCT DATA</h3>

      <button
        className="flex items-center justify-center bg-gray-800 text-white p-2"
        onClick={uploadProducts}
        disabled={isLoading}
      >
        {isPending ? <SpinnerMini /> : "Upload Products"}
      </button>
      {/* 
      <button
        className="bg-red-500 text-white p-2"
        onClick={clearProducts}
        disabled={isLoading}
      >
        Clear Products
      </button> */}

      {isError && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default Uploader;
