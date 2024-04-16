import React, { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { getMovieDetail } from "../api/movies/getMovieDetail";
import { isAdmin } from "../api/userAuth";
import RatingComponent from "../components/rateMovie";
import CommentForm from "../components/commentForm";
import EmailShareForm from "../components/emailShareForm";
import deleteMovie from "../api/movies/delete";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { movieImageFor } from "../api/movies/getMovies";

export async function loader({ params }) {
  var movie = await getMovieDetail(params.movieId);
  return { movie };
}

function MovieDetail() {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { movie } = useLoaderData();

  const handleDelete = async (movieId) => {
    await deleteMovie(movieId);
    navigate("/movies?deleted=true");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setIsUserAdmin(isAdmin());
  }, [setIsUserAdmin, isLoggedIn, navigate]);

  return (
    <>
      {movie && (
        <div>
          <img
            className="movie-image"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "fill",
            }}
            src={movieImageFor(movie.movie.imagePath)}
            alt="Movie Poster"
          />
          <div className="px-40">
            <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
              {movie.movie.name}
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              {movie.movie.description}
            </p>
            {isUserAdmin && (
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
                  {/* Button that takes to update image page */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/movies/updateImage/${movie.movie.id}`)
                    }
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Update Image
                  </button>
                </div>
              </>
            )}

            <p className="text-lg text-gray-900">
              Rating:{" "}
              {parseInt(movie.movie.totalRates) == 0
                ? 0
                : `${
                    parseFloat(movie.movie.rating) /
                    parseFloat(movie.movie.totalRates)
                  } (${movie.movie.totalRates} ratings)`}
            </p>
            <p className="text-lg ">Release Date: {movie.movie.releaseDate}</p>
            {movie.hasRated || <RatingComponent movieId={movie.movie.id} />}
            <br />

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
      )}
    </>
  );
}

export default MovieDetail;
