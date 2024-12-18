import { FormEvent, useEffect, useState } from "react";
import { useUpdateProduct } from "./useUpdateProduct.ts";
import { ProductType } from "../../interfaces.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

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
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10"
      >
        <div className="flex flex-col w-full max-w-sm border rounded-md px-4 py-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-[6.2px] border-[rgba(255,153,40,1)] text-gray-700 font-medium gap-4 shadow-xl sm:max-w-md sm:px-6 sm:py-8 md:max-w-lg md:px-8 md:py-10">
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              className="w-full h-10 px-2 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none sm:h-10 sm:px-4 md:h-10 md:px-5 lg:h-10 lg:px-6"
              id="name"
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <input
              className="w-full h-10 px-2 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none sm:h-10 sm:px-4 md:h-10 md:px-5 lg:h-10 lg:px-6"
              id="description"
              type="text"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-1">
              Category
            </label>
            <input
              className="w-full h-10 px-2 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none sm:h-10 sm:px-4 md:h-10 md:px-5 lg:h-10 lg:px-6"
              id="category"
              type="text"
              placeholder="Enter product category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">
              Price
            </label>
            <input
              className="w-full h-10 px-2 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none sm:h-10 sm:px-4 md:h-10 md:px-5 lg:h-10 lg:px-6"
              id="price"
              type="number"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-1">
              Stock
            </label>
            <input
              className="w-full h-10 px-2 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none sm:h-10 sm:px-4 md:h-10 md:px-5 lg:h-10 lg:px-6"
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
          className="w-20 flex justify-center items-center bg-gray-800 text-white px-3 py-2 rounded-md shadow-md"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
