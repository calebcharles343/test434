import React, { useState } from "react";
import { useCreateReview } from "./useCreateReview.ts";
import toast from "react-hot-toast";
import ReviewStars from "./ReviewStars.tsx";

interface ReviewFormProps {
  productId: number;
  refetchReviews: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  refetchReviews,
}) => {
  const [reviewText, setReviewText] = useState<string>();
  const [rating, setRating] = useState<number>();

  const { createReview } = useCreateReview(productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !reviewText) {
      toast.error("Provide both Review and Rating");
      return;
    }

    if (rating < 1) {
      toast.error("Rating must be greater than 0");
      return;
    }

    createReview({ review: reviewText, rating } as any);
    setReviewText("");
    setRating(0); // Reset to default rating after submission
    refetchReviews();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      <div className="flex flex-col mb-4">
        <label htmlFor="review" className="font-bold text-center mb-2">
          Review
        </label>
        <textarea
          id="review"
          className="p-2 h-24 text-sm border rounded-lg shadow-md resize-none"
          value={reviewText}
          maxLength={200}
          minLength={1}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-bold text-center mb-2">Rating</label>
        <ReviewStars rating={rating!} setRating={setRating} />
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
