import { useEffect } from "react";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { movieImageFor, searchMovies } from "../api/movies/getMovies";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export async function loader({ params }) {
  var movies = await searchMovies(params.query);
  return { movies };
}

function SearchMovies() {
  // const isLoggedIn = useAuth();
  // const navigate = useNavigate();
  const { movies } = useLoaderData();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "aliceblue",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="p-2">
      <Grid container spacing={4} marginBlock={3}>
        {movies &&
          movies.map((movie) => (
            <>
              <Grid item xs={8} sm={6} md={3} mb={2}>
                <Link to={`/movies/${movie.id}`}>
                  <Item className="flex justify-center">
                    <img
                      src={movieImageFor(movie.imagePath)}
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
    </div>
  );
}

export default SearchMovies;
