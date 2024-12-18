import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchProducts } from "./useFetchProducts.ts";
import { setProducts } from "../../store/productsSlice.ts";
import { ProductType } from "../../interfaces.ts";
import Modal from "../../ui/Modal.tsx";
import CreateProductForm from "./CreateProductForm.tsx";
import SingleProduct from "./SingleProduct.tsx";

const Products: React.FC = () => {
  const dispatch = useDispatch();

  // Fetch products using React Query
  const { products, isLoadingProducts, refetchProducts } = useFetchProducts();

  // Refetch products on component mount
  useEffect(() => {
    refetchProducts();
  }, [refetchProducts]);

  // Update Redux store when products data changes
  useEffect(() => {
    if (products?.data) {
      dispatch(setProducts(products.data));
      // Save the first product item in local storage
      localStorage.setItem("firstProduct", JSON.stringify(products.data[0]));
    }
  }, [products, dispatch]);

  // Get user
  const storedUserJSON = localStorage.getItem("localUser");
  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    console.log("No stored user found");
  }

  if (isLoadingProducts) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex flex-col items-center min-w-full md:min-w-[400px] gap-4">
      {storedUser?.role === "Admin" && (
        <div className="flex items-center justify-between gap-2 mt-2">
          <Modal>
            <Modal.Open open="createProduct">
              <button
                className="text-xs text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md"
                type="button"
              >
                Add Product
              </button>
            </Modal.Open>

            <Modal.Window name="createProduct">
              <CreateProductForm />
            </Modal.Window>
          </Modal>
        </div>
      )}
      <ul className="grid grid-cols-1 mid:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {products?.data.map((product: ProductType) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
