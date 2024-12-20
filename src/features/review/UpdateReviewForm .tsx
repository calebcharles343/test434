import { useState } from "react";
import { useUpdateReview } from "./useUpdateReview.ts";

interface ReviewFormProps {
  productId: number;
  reviewId: number;
  refetchReviews: () => void;
}

const UpdateReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  reviewId,
  refetchReviews,
}) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const { UpdateReview } = useUpdateReview(productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { review: reviewText, rating };

    UpdateReview({ reviewId, data } as any);
    setReviewText("");
    setRating(0);
    refetchReviews();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col mb-4">
        <label htmlFor="review" className="mb-2">
          Review
        </label>
        <textarea
          id="review"
          className="p-2 border rounded-lg shadow-md"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="rating" className="mb-2">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          className="p-2 border rounded-lg shadow-md"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          min="0"
          max="5"
          step="0.1"
        />
      </div>
      <button
        type="submit"
        className="px-4  py-2 bg-blue-500 text-white rounded-lg"
      >
        Edit Review
      </button>
    </form>
  );
};

export default UpdateReviewForm;
