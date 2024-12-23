import React from "react";
import { useParams } from "react-router-dom";
import { useFetchReviews } from "../features/review/useFetchReviews";
import { ReviewType } from "../interfaces";
import { useGetProduct } from "../features/product/useGetProduct"; // Correct path
import SingleProduct from "../features/product/SingleProduct"; // Correct path
import ReviewForm from "../features/review/ReviewForm";
import Review from "../features/review/Review";
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  let ID;
  const firstProduct = JSON.parse(localStorage.getItem("firstProduct") || "{}");

  ID = Number(id) || Number(firstProduct.id);

  const { product, isLoadingProduct } = useGetProduct(ID);
  const { reviews, refetch: refetchReviews } = useFetchReviews(ID);

  if (isLoadingProduct) return <p>Loading...</p>;

  if (!product?.data) {
    return <p>No product to display</p>;
  }

  const mainProduct = product?.data || firstProduct;

  console.log(mainProduct);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col md:flex-row lg:w-[800px] gap-8 p-4 overflow-y-auto">
        {/* Product Section */}
        <div className="flex flex-col md:w-1/2 md:mr-4 md:px-4">
          <SingleProduct product={mainProduct} ID={ID} />
          <ReviewForm productId={ID} refetchReviews={refetchReviews} />
        </div>

        {/* Reviews Section */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <div>
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <div className="min-w-full md:min-w-[268.5px] border p-4 rounded-lg shadow-md">
              <p>{mainProduct.description}</p>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-lg font-semibold mb-2">Reviews</h2>
            {reviews?.data.length ? (
              mainProduct?.Reviews?.map((review: ReviewType) => (
                <Review
                  key={review.id}
                  review={review}
                  refetchReviews={refetchReviews}
                />
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
