import { useEffect } from "react";
import { useAuth } from "../hooks/auth";
import {
  Link,
  useNavigate,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { movieImageFor, searchMovies } from "../api/movies/getMovies";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { addTrendingMovie, trendingMovies } from "../api/movies/trendingMovies";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  console.log(page);
  var movies = await trendingMovies(page);
  return { movies };
}

function TrendingMovies() {
  // const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const { movies } = useLoaderData();
  console.log(movies);
  let [searchParams, setSearchParams] = useSearchParams();
  const page =
    searchParams.get("page") && searchParams.get("page") > 0
      ? parseInt(searchParams.get("page"))
      : 0;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "aliceblue",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const onAdd = async (movie) => {
    var movieResult = await addTrendingMovie(movie);
    //navigate(`/movies/${movieResult.id}`);
  };
  return (
    <div className="p-2">
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => navigate(`/movies/trending?page=${page + 1}`)}
      >
        Next
      </button>
      <Grid container spacing={4} marginBlock={3}>
        {movies &&
          movies.map((movie) => (
            <>
              <Grid item xs={8} sm={6} md={3} mb={2}>
                <Item className="flex justify-center">
                  <img
                    src={movie.imageUrl}
                    style={{ width: "300px" }} // Corrected style prop
                    className="rounded-3xl"
                    alt="Movie Image"
                  />
                </Item>
                <h6 className="text-lg font-bold text-center">{movie.title}</h6>
                <p className="mb-3 text-gray-500 dark:text-gray-400 text-justify">
                  {movie.description.substring(0, 200) + "..."}
                </p>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => onAdd(movie)}
                >
                  Add
                </button>
              </Grid>
            </>
          ))}
      </Grid>
    </div>
  );
}

export default TrendingMovies;
