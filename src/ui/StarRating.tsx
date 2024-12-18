type StarRatingProps = {
  maxStars?: number; // Default to 5 stars if not provided
  initialRating?: number; // Initial rating value
};

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  initialRating = 0,
}) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starIndex = index + 1;
        return (
          <span
            key={starIndex}
            style={{
              fontSize: "20px",
              color: initialRating >= starIndex ? "#ffc107" : "#e4e5e9",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
