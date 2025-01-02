import { useState } from "react";
import { useCreateReview } from "./useCreateReview.ts";
import toast from "react-hot-toast";

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
    if (!rating || !reviewText) {
      toast.error("invalid inputs");
      return;
    }
    if (rating < 1) {
      toast.error("Rating must be greater than 0");
      return;
    }

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
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value >= 1 && value <= 5) {
              setRating(value);
            } else if (!e.target.value) {
              setRating(0); // Reset to 0 if the field is cleared
            }
          }}
          min="1"
          max="5"
          step="1"
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
