import { useState } from "react";
import { ReviewType } from "../../interfaces.ts";
import { localStorageUser } from "../../utils/localStorageUser.ts";
import { useDeleteReview } from "./useDeleteReview.ts";
import UpdateReviewForm from "./UpdateReviewForm.tsx";
import { dateformat } from "../../utils/dateFormat.ts";

interface ReviewProps {
  review: ReviewType;
  refetchReviews: () => void;
}

const Review: React.FC<ReviewProps> = ({ review, refetchReviews }) => {
  const [isEdit, isSetEdit] = useState<boolean>(false);

  const { deleteReview } = useDeleteReview(review?.productId!);
  const localStorageUserX = localStorageUser();

  const handleToggleEdit = () => {
    isSetEdit(!isEdit);
  };

  return (
    <div className="border-l-8 border-[#FFA82B] border p-4 rounded-lg mb-4 bg-white shadow-lg">
      <div className=" flex items-center gap-4">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold">{review.User?.name}</p>
            <div className="flex items-center gap-2">
              {localStorageUserX.id === review?.User?.id && (
                <button
                  className="text-sm text-blue-500"
                  // onClick={() => updateReviewMutation.mutate(review)}
                  onClick={handleToggleEdit}
                >
                  {isEdit ? "Cancel Edit" : "Edit"}
                </button>
              )}

              {localStorageUserX.role === "Admin" && (
                <button
                  className="text-sm text-red-500"
                  onClick={() => deleteReview(review?.id!)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-700 mt-2">{review.review}</p>
          <p className="text-sm text-blue-500 font-bold mt-1">
            Rating: {review.rating.toFixed(1)}
          </p>
          <span className="text-xs">{dateformat(review?.createdAt!)}</span>
        </div>
      </div>
      {isEdit && (
        <div className="border px-4 pb-4">
          <UpdateReviewForm
            reviewId={review.id!}
            productId={review.productId!}
            refetchReviews={refetchReviews}
            isSetEdit={isSetEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Review;
