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

  const { createReview } = useCreateReview(productId);

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
          className="p-2 h-24 text-sm border rounded-lg shadow-md resize-none"
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
        className="p-2 text-xs bg-blue-500 text-white rounded-lg"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
