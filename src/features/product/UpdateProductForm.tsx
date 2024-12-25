import { FormEvent, useEffect, useState } from "react";
import { useUpdateProduct } from "./useUpdateProduct.ts";
import { ProductType } from "../../interfaces.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { closeModal } from "../../store/modalSlice.ts";
import { useDispatch } from "react-redux";

interface UpdateProductFormProps {
  product: ProductType | undefined;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product }) => {
  const { updateProduct, isPending, errorMessage } = useUpdateProduct(
    product?.id!
  );

  const [formData, setFormData] = useState<Partial<ProductType>>({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const dispatch = useDispatch();

  const storeProducts = useSelector(
    (state: RootState) => state.products.products
  );

  useEffect(() => {
    const filterP = storeProducts.filter(
      (productStore: ProductType) => productStore.id === product?.id
    );
    if (product) {
      setFormData({
        name: filterP[0].name,
        description: filterP[0].description,
        category: filterP[0].category,
        price: filterP[0].price,
        stock: filterP[0].stock,
      });
    }
  }, [product, storeProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.price || formData.price < 0) {
      alert("Price must be a positive number.");
      return;
    }
    if (!formData.stock || formData.stock < 0) {
      alert("Stock must be a positive number.");
      return;
    }
    updateProduct(formData);
    if (!isPending) dispatch(closeModal());
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-md bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0"
      >
        <div className="flex flex-col w-full gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-bold text-gray-700"
            >
              Name
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
              id="name"
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-1 font-bold text-gray-700"
            >
              Description
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
              id="description"
              type="text"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-1 font-bold text-gray-700"
            >
              Category
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
              id="category"
              type="text"
              placeholder="Enter product category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-1 font-bold text-gray-700"
            >
              Price
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
              id="price"
              type="number"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block mb-1 font-bold text-gray-700"
            >
              Stock
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
              id="stock"
              type="number"
              placeholder="Enter product stock amount"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          {errorMessage && (
            <span
              className="text-[12px] text-center text-red-500"
              aria-live="polite"
            >
              {errorMessage}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
