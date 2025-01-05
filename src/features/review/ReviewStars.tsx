import React, { useState } from "react";

interface ReviewStarsProps {
  rating: number;
  setRating: (rating: number) => void;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex justify-center text-2xl border shadow-md px-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`p-1 ${
            star <= (hover ?? rating) ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default ReviewStars;
