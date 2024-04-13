import { useForm } from "react-hook-form";
import createMovie from "../api/movies/createMovie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

function CreateMovie() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      file: "",
    },
  });

  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const onSubmit = async ({ title, description }) => {
    const date = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
    console.log("Date");
    console.log(date);
    var result = await createMovie(title, description, file, date);
    navigate(`/movies/${result.id}`);
  };

  return (
    <div className="flex flex-col align-center">
      <img
        className="movie-image"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
        src="https://www.vmcdn.ca/f/files/sudbury/uploadedImages/news/lifestyle/2015/04/170415_Antibirth.jpg"
        alt="Movie Poster"
      />
      <div className="p-4">
        <h2 className="text-4xl font-bold text-center">Add a new movie</h2>

        <form
          className="space-y-4 md:space-y-6 flex flex-col items-center"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-2/5">
            <label
              htmlFor="moviename"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Movie name
            </label>
            <input
              {...register("title", {
                required: "Movie title is required",
              })}
              type="text"
              id="moviename"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Movie Name"
            />
            {errors.title && errors.title?.message}
          </div>
          <div className="w-2/5">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-900 "
            >
              Movie Description
            </label>
            <textarea
              {...register("description", {
                required: "Movie description is required",
              })}
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write movie description here..."
            ></textarea>
            {errors.description && errors.description?.message}
          </div>
          <div className="w-2/5">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-900 "
            >
              Release Date
            </label>
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className="w-2/5">
            <label
              className="block mb-2 text-lg font-medium text-gray-900 "
              htmlFor="file_input"
            >
              Upload image
            </label>
            <input
              {...register("file", {
                required: "Image is required",
              })}
              className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleChange}
            />
            {errors.file && errors.file?.message}
          </div>
          <div className="self-center flex-1 text-center">
            <button
              id="button"
              type="submit"
              className="bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMovie;
