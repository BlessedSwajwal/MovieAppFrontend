import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Registeration from "./pages/registration";
import Navbar from "./components/navbar";
import MovieHome from "./pages/movieHome";
import MovieDetail, { loader as movieDetailLoader } from "./pages/movieDetail";
import EditMovie from "./pages/editMovie";
import SearchMovies, { loader as searchLoader } from "./pages/searchResults";
import CreateMovie from "./pages/createMovie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Registeration /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "movies",
        element: <MovieHome />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetail />,
        loader: movieDetailLoader,
      },
      {
        path: "movies/edit/:movieId",
        element: <EditMovie />,
        loader: movieDetailLoader,
      },
      {
        path: "movies/search/:query",
        element: <SearchMovies />,
        loader: searchLoader,
      },
      {
        path: "movies/create",
        element: <CreateMovie />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
