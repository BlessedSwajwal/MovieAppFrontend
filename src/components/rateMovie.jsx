import { useState } from "react";
import { rateMovie } from "../api/movies/rateMovie";

function RatingComponent({ movieId }) {
  const [rating, setRating] = useState(0);

  const handleRate = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    await rateMovie(movieId, rating);
    location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-semibold mb-2">Rate from 0 to 10:</p>
      <div className="flex space-x-2">
        {[...Array(11).keys()].map((value) => (
          <button
            key={value}
            className={`py-2 px-4 rounded-lg border ${
              rating === value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleRate(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        type="button"
        className=" mt-3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        onClick={() => handleSubmit()}
      >
        Rate
      </button>
    </div>
  );
}

export default RatingComponent;
