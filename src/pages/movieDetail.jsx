import React from "react";
import { useLoaderData } from "react-router-dom";
import { getMovieDetail } from "../api/movies/getMovieDetail";
import { isAdmin } from "../api/userAuth";
import RatingComponent from "../components/rateMovie";
import CommentForm from "../components/commentForm";
import EmailShareForm from "../components/emailShareForm";
import deleteMovie from "../api/movies/delete";
import { useNavigate } from "react-router-dom";

export async function loader({ params }) {
  var movie = await getMovieDetail(params.movieId);
  return { movie };
}

function MovieDetail() {
  const navigate = useNavigate();

  const { movie } = useLoaderData();

  const handleDelete = async (movieId) => {
    await deleteMovie(movieId);
    navigate("/movies");
  };

  const roundedRating = Math.round(parseFloat(movie.movie.rating));

  // Create an array to store the JSX elements for the stars
  const stars = [];
  for (let i = 0; i < 10; i++) {
    // Determine whether to render a filled or empty star based on the rounded rating
    const starClassName =
      i < roundedRating ? "text-yellow-300" : "text-gray-300";
    stars.push(
      <svg
        key={i}
        className="w-4 h-4 me-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path
          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          className={starClassName}
        />
      </svg>
    );
  }

  return (
    <div>
      <img
        className="movie-image"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "fill",
        }}
        src={`data:image/jpeg;base64,${movie.movie.image}`}
        alt="Movie Poster"
      />
      <div className="px-40">
        <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
          {movie.movie.name}
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          {movie.movie.description}
        </p>
        {isAdmin && (
          <>
            <div style={{ display: "flex" }} className="m-2 gap-2">
              {/* Delete button */}
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => handleDelete(movie.movie.id)}
              >
                Delete
              </button>
              {/* Button that takes to edit page */}
              <button
                type="button"
                onClick={() => navigate(`/movies/edit/${movie.movie.id}`)}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Edit
              </button>
            </div>
          </>
        )}

        <p className="text-lg text-gray-900">
          Rating:{" "}
          {parseInt(movie.movie.totalRates) == 0
            ? 0
            : parseFloat(movie.movie.rating) /
              parseFloat(movie.movie.totalRates)}
        </p>
        <div className="flex items-center">{stars}</div>

        {movie.hasRated || <RatingComponent movieId={movie.movie.id} />}
        <br />
        <p className="text-lg text-gray-900">
          Release Date: {movie.movie.releaseDate}
        </p>
        <CommentForm movieId={movie.movie.id} />
        {movie.movie.comments.map((comment) => (
          <>
            <strong>{comment.commenterName}:</strong> {comment.description}
            <br />
          </>
        ))}
        <EmailShareForm movieId={movie.movie.id} />
      </div>
    </div>
  );
}

export default MovieDetail;
