import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ItemType } from "../../interfaces.ts";
import { addItem } from "../../store/cartSlice.ts";
// import SpinnerMini from "../../ui/SpinnerMini.tsx";
import StarRating from "../../ui/StarRating.tsx";
import UpdateProductForm from "./UpdateProductForm.tsx";
import Modal from "../../ui/Modal.tsx";
import { useUploadImage } from "../../hooks/images/useUploadImage.ts";
// import { useGetProduct } from "./useGetProduct.ts";
import { useDeleteProduct } from "./useDeleteProduct.ts";
import { imageHeader } from "../../utils/imageApiHeader.ts";

import { toast } from "react-hot-toast";
import { sessionStorageUser } from "../../utils/sessionStorageUser.ts";
import { useFetchProducts } from "./useFetchProducts.ts";

interface ProductProps {
  product: any;
  ID?: number;
}

export default function SingleProduct({ product }: ProductProps) {
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const [itemQuantity, setitemQuantity] = useState<number>(0);
  const { id } = useParams<{ id: string }>();

  // const {
  //   product: freshProduct,
  //   refetchProduct,
  //   // isLoadingProduct,
  // } = useGetProduct(product.id);
  const { deleteProduct } = useDeleteProduct();

  const sessionStorageUserX = sessionStorageUser();

  // Fetch products using React Query
  const { refetchProducts } = useFetchProducts();

  const { uploadImage, isUploading } = useUploadImage(
    imageHeader(`productAvatar-${Number(id)!}`)
  );

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
        setErrorFile("File must be in JPG, JPEG, or PNG format.");
        return;
      }
      setErrorFile("");
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData, {
        onSuccess: () => {
          refetchProducts();
        },
        onError: (error) => {
          // setErrorFile("An error occurred while uploading the image.");
          console.error("Upload Error:", error, errorFile);
        },
      });
    }
  };

  const dispatch = useDispatch();

  const handleAddItem = (item: ItemType) => {
    if (item.quantity <= 0) {
      toast.error("Item quantity cannot be zero");
      return;
    }
    dispatch(addItem(item));
  };

  const handleAddQtr = () => {
    setitemQuantity(itemQuantity + 1);
  };

  const handleReduceQtr = () => {
    if (itemQuantity > 0) setitemQuantity(itemQuantity - 1);
  };

  useEffect(() => {
    setitemQuantity(0);
  }, []);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/home/product/${id}`);
  };

  const handleDelete = (id: number) => {
    const userConfirmed = confirm(
      "Are you sure you want to delete this product?"
    );
    if (userConfirmed) {
      deleteProduct(Number(id)!);
    }
  };

  // if (isLoadingProduct) return <SpinnerMini />;

  return (
    <div className="text-gray-600 flex flex-col w-[280px] border border-gray-200 p-4 gap-4 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-base font-semibold">{product.name}</p>
        {!id && (
          <button
            onClick={() => handleClick(product.id)}
            className="text-xs px-3 py-1 border border-green-500 text-green-500 rounded-full"
          >
            Info
          </button>
        )}
      </div>
      <img
        src={product.avatar}
        alt={`Image of ${product.name}`}
        className="w-full h-[150px] object-contain rounded-lg"
      />

      <div className="flex items-center justify-between mt-2">
        <div>
          <span className="text-lg font-semibold text-green-700">
            ${product.price}
          </span>
          <div className="flex items-center gap-2 text-xs mt-1">
            <span>Qtr: {itemQuantity}</span>
            <button
              onClick={handleReduceQtr}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full shadow-sm"
            >
              -
            </button>
            <button
              onClick={handleAddQtr}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full shadow-sm"
            >
              +
            </button>
          </div>
        </div>
        <button
          className="mt-2 sm:mt-0 px-3 py-1 text-xs text-white bg-blue-500 border border-blue-500 rounded-full hover:bg-blue-600"
          onClick={() =>
            handleAddItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: itemQuantity,
            })
          }
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-2">
        <StarRating initialRating={product?.ratingAverage} />
      </div>
      {id && sessionStorageUserX?.role === "Admin" && (
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="bg-white rounded-md p-1">
            <input
              id="imageInput"
              type="file"
              className="hidden"
              onChange={handleUpload}
            />
            <label
              htmlFor="imageInput"
              className="flex items-center justify-center text-xs border border-gray-300 p-1 rounded-lg cursor-pointer w-24"
            >
              {isUploading ? "..." : "Photo +"}
            </label>
            {/* {errorFile && <p className="text-xs text-red-500">{errorFile}</p>} */}
          </div>
          <Modal>
            <Modal.Open open="editProduct">
              <button
                className="text-xs px-2 py-1 border rounded-md"
                type="button"
              >
                Edit
              </button>
            </Modal.Open>
            <Modal.Window name="editProduct">
              <UpdateProductForm product={product} />
            </Modal.Window>
          </Modal>
          <button
            onClick={() => handleDelete(Number(id)!)}
            className="text-xs px-2 py-1 border border-red-500 text-red-500 rounded-md"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
