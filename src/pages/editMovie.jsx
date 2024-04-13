import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import updateNameAndDescription from "../api/movies/updateNameAndDesc";

function EditMovie() {
  const { movie } = useLoaderData();
  const [title, setTitle] = useState(movie.movie.name);
  const [description, setDescription] = useState(movie.movie.description);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNameAndDescription(movie.movie, title, description);
    navigate(`/movies/${movie.movie.id}`);
  };

  return (
    <div>
      <h3 className="text-5xl font-bold text-center p-2">Edit Movie</h3>

      <img
        className="movie-image p-4 rounded-lg"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
        src={`data:image/jpeg;base64,${movie.movie.image}`}
        alt="Movie Poster"
      />
      <div>
        <label
          htmlFor="movie_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Movie Name
        </label>
        <form className="space-y-4 p-10" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="rounded-md border border-gray-300 p-2 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditMovie;
