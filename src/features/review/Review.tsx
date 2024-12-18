import { ReviewType } from "../../interfaces.ts";
import { useDeleteReview } from "./useDeleteReview.ts";

interface ReviewProps {
  review: ReviewType;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const { deleteReview } = useDeleteReview(review?.productId!);

  return (
    <div className="border p-4 rounded-lg mb-4 flex items-center gap-4 shadow-lg">
      {/* <img
        className="h-20 w-20 rounded-full object-cover"
        src={review.user?.avatar}
        alt={`Image of ${review.user?.name}`}
      /> */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold">{review.user?.name}</p>
          <div className="flex items-center gap-2">
            <button
              className="text-sm text-blue-500"
              // onClick={() => updateReviewMutation.mutate(review)}
            >
              Edit
            </button>
            <button
              className="text-sm text-red-500"
              onClick={() => deleteReview(review?.id!)}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-gray-700 mt-2">{review.review}</p>
        <p className="text-sm text-gray-600 mt-1">
          Rating: {review.rating.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default Review;
