import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProducts } from "./useFetchProducts.ts";
import { setProducts } from "../../store/productsSlice.ts";
import { ProductType } from "../../interfaces.ts";
import Modal from "../../ui/Modal.tsx";
import CreateProductForm from "./CreateProductForm.tsx";
import SingleProduct from "./SingleProduct.tsx";
import { RootState } from "../../store/store.ts";
import { sessionStorageUser } from "../../utils/sessionStorageUser.ts";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.SearchBarQuery.query);
  const filterByRating = useSelector(
    (state: RootState) => state.SearchBarQuery.filterByRating
  );

  // Fetch products using React Query
  const { products, refetchProducts } = useFetchProducts();

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

  // Get authenticated user
  const storedUser = sessionStorageUser();

  // Filter products based on name, description, and category
  const filteredProducts = products?.data.filter((p) => {
    const queryMatch =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());

    const ratingMatch = !filterByRating || p.ratingAverage >= 4;

    return queryMatch && ratingMatch;
  });

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
      <ul className="grid grid-cols-1 mediumMobile:grid-cols-1 largeMobile:grid-cols-1 tablet:grid-cols-2 mid:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16">
        {filteredProducts?.map((product: ProductType) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
