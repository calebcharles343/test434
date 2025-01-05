import { FormEvent, useState } from "react";
import { ProductType } from "../../interfaces";
import { useCreateProduct } from "./useCreateProduct";
import { closeModal } from "../../store/modalSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const CreateProductForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<ProductType>>({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const { createProduct, isPending } = useCreateProduct();
  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.price || formData.price < 0) {
      toast.error("Price must be a positive number.");
      return;
    }
    if (!formData.stock || formData.stock < 0) {
      toast.error("Stock must be a positive number.");
      return;
    }

    createProduct(formData);

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
            <label htmlFor="name" className="block mb-1 font-bold">
              Name
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm"
              id="name"
              type="text"
              placeholder="Enter product name"
              maxLength={30}
              minLength={1}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-bold">
              Description
            </label>
            <textarea
              className="w-full h-24 md:h-32 px-4 py-2 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm"
              id="description"
              placeholder="Enter product description"
              maxLength={200}
              minLength={1}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-1 font-bold">
              Category
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm"
              id="category"
              type="text"
              placeholder="Enter product category"
              maxLength={50}
              minLength={1}
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1 font-bold">
              Price
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm"
              id="price"
              type="number"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-1 font-bold">
              Stock
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm"
              id="stock"
              type="number"
              placeholder="Enter product stock amount"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add +"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
