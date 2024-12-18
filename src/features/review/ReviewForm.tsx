import { useState } from "react";
import { useCreateReview } from "./useCreateReview.ts";

interface ReviewFormProps {
  productId: number;
  refetchReviews: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  refetchReviews,
}) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const { createReview, errorMessage } = useCreateReview(productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview({ review: reviewText, rating } as any);
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
          className="p-2 border rounded-lg"
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
          className="p-2 border rounded-lg"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          min="0"
          max="5"
          step="0.1"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Submit Review
      </button>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default ReviewForm;
