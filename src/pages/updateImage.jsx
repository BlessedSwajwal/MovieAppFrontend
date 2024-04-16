import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import updateImage from "../api/movies/updateImage";

function UpdateImage() {
  const [file, setFile] = useState();
  let { movieId } = useParams();
  const navigate = useNavigate();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Movie Id");
    var res = await updateImage(movieId, file);
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="m-3">
      <h2 className="text-4xl font-bold text-center p-4">Update image page</h2>
      <form className="space-y-4 md:space-y-6 flex flex-col items-center">
        <div className="w-2/5">
          <label
            className="block mb-2 text-lg font-medium text-gray-900"
            htmlFor="file_input"
          >
            Upload image
          </label>
          <input
            className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={handleChange}
          />
        </div>
        <button
          id="button"
          type="submit"
          className="m-3 bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateImage;
