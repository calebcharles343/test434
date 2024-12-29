import { useState } from "react";
import { useUpdateReview } from "./useUpdateReview.ts";
import toast from "react-hot-toast";

interface ReviewFormProps {
  productId: number;
  reviewId: number;
  refetchReviews: () => void;
  isSetEdit: (boolean: boolean) => void;
}

const UpdateReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  reviewId,
  refetchReviews,
  isSetEdit,
}) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const { UpdateReview } = useUpdateReview(productId);

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
    const data = { review: reviewText, rating };

    UpdateReview({ reviewId, data } as any);
    setReviewText("");
    setRating(0);
    refetchReviews();
    isSetEdit(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col mb-4">
        <label htmlFor="review" className="mb-2">
          Review
        </label>
        <textarea
          id="review"
          className="p-2 h-24 text-sm border rounded-lg shadow-md"
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
        Edit Review
      </button>
    </form>
  );
};

export default UpdateReviewForm;
