import { MAX_RATING } from "@/config/constants";

const MovieRating = ({ initialRating = 0, maxRating = MAX_RATING }) => {
  const stars = [];
  for (let i = 0; i < maxRating; i++) {
    stars.push(
      <i
        key={i}
        className={`text-xl ${
          i < initialRating
            ? "fas fa-star text-yellow-500"
            : "far fa-star  text-gray-400"
        }`}
      ></i>
    );
  }

  return <div>{stars}</div>;
};

export default MovieRating;
