import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchReviews } from "../features/review/useFetchReviews";
import { ReviewType } from "../interfaces";
import { useGetProduct } from "../features/product/useGetProduct"; // Correct path
import SingleProduct from "../features/product/SingleProduct"; // Correct path
import ReviewForm from "../features/review/ReviewForm";
import Review from "../features/review/Review";
import SpinnerMini from "../ui/SpinnerMini";
import { sessionStorageUser } from "../utils/sessionStorageUser";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(2); // Initial number of reviews to show

  let ID;
  const firstProduct = JSON.parse(localStorage.getItem("firstProduct") || "{}");
  ID = Number(id) || Number(firstProduct.id);

  const { product, isLoadingProduct } = useGetProduct(ID);
  const { reviews, refetch: refetchReviews } = useFetchReviews(ID);

  if (isLoadingProduct)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <SpinnerMini />;
      </div>
    );

  if (!product?.data) {
    return <p>No product to display</p>;
  }

  const mainProduct = product?.data || firstProduct;
  const sessionStorageUserX = sessionStorageUser(); // Check if the user has already reviewed the product

  // Ensure Reviews is defined
  const userReview = mainProduct.Reviews?.find(
    (review: ReviewType) => review.User?.id === sessionStorageUserX.id
  );
  const otherReviews = mainProduct.Reviews?.filter(
    (review: ReviewType) => review.User?.id !== sessionStorageUserX.id
  );

  // Combine user review and other reviews, with user review first
  const combinedReviews = userReview
    ? [userReview, ...otherReviews!]
    : otherReviews || [];

  // Slice the reviews to show based on visibleReviewsCount
  const displayedReviews = combinedReviews.slice(0, visibleReviewsCount);

  const handleShowMore = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 5); // Load 5 more reviews on each click
  };
  const handleShowLess = () => {
    setVisibleReviewsCount(2);
  };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <div className="flex flex-col md:flex-row lg:w-[800px] gap-8 p-4 overflow-y-auto">
        {/* Product Section */}
        <div className="flex flex-col md:w-1/2 md:mr-4 md:px-4">
          <SingleProduct product={mainProduct} ID={ID} />
          {!userReview && (
            <ReviewForm productId={ID} refetchReviews={refetchReviews} />
          )}
        </div>

        <div className="flex flex-col gap-4 md:w-1/2">
          <div>
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>{" "}
            <div className="min-w-full md:min-w-[268.5px] border p-4 rounded-lg shadow-md">
              <p>{mainProduct.description}</p>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-2">Reviews</h2>{" "}
              <span className="text-sm">No: {reviews?.data.length}</span>{" "}
            </div>
            <div className="max-h-[420px] overflow-y-scroll border-gray-600 border-t border-b shadow-inner py-1">
              {displayedReviews.length ? (
                displayedReviews.map((review: ReviewType) => (
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

          {combinedReviews.length > 2 && (
            <>
              {visibleReviewsCount < combinedReviews.length && (
                <button
                  className="text-xs mt-1 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={handleShowMore}
                >
                  Show More
                </button>
              )}
              {visibleReviewsCount > 2 && (
                <button
                  className="text-xs mt-1 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={handleShowLess}
                >
                  Show Less
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
