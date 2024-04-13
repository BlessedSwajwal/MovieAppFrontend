import { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getMovies } from "../api/movies/getMovies";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { isAdmin } from "../api/userAuth";
import SearchMovieBar from "../components/searchMovie";

function MovieHome() {
  const isLoggedIn = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);
  const currentPage = searchParams.get("page") ? searchParams.get("page") : 0;

  useEffect(() => {
    async function fetchMovies(page) {
      var fetchedMovies = await getMovies(page ? page : 0);
      setMovies(fetchedMovies);
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    fetchMovies(searchParams.get("page"));
  }, [isLoggedIn, navigate, searchParams]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "aliceblue",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="p-10">
      {isAdmin() && (
        <>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => navigate("/movies/create")}
          >
            Add new
          </button>
        </>
      )}
      <SearchMovieBar />
      <Grid container spacing={4} marginBlock={2}>
        {movies &&
          movies.map((movie) => (
            <>
              <Grid item xs={8} sm={6} md={3} mb={2}>
                <Link to={`/movies/${movie.id}`}>
                  <Item className="flex justify-center">
                    <img
                      src={`data:image;base64,${movie.image}`}
                      style={{ width: "300px" }} // Corrected style prop
                      className="rounded-3xl"
                      alt="Movie Image"
                    />
                  </Item>
                </Link>
                <h6 className="text-lg font-bold text-center">{movie.name}</h6>
                <p className="mb-3 text-gray-500 dark:text-gray-400 text-justify">
                  {movie.description.substring(0, 200) + "..."}
                </p>
              </Grid>
            </>
          ))}
      </Grid>
      <div className="flex justify-center">
        {currentPage != 0 && (
          <a
            href={`http://localhost:5173/movies?page=${
              Number(currentPage) - 1
            }`}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </a>
        )}

        {movies && movies.length >= 10 && (
          <a
            href={`http://localhost:5173/movies?page=${
              Number(currentPage) + 1
            }`}
            className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}

export default MovieHome;
