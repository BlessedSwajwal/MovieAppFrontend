/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import shareMovieWithEmail from "../api/movies/emailSender";

function EmailShareForm({ movieId }) {
  const [email, setEmail] = useState("");

  const onSend = async (data) => {
    shareMovieWithEmail(movieId, email);
    setEmail("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        marginBottom: "50px",
      }}
      className="mt-10"
    >
      <form onSubmit={handleSubmit(onSend)}>
        <h6 className="text-lg font-bold">Share</h6>

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {errors.email && errors.email?.message}
        <br />
        <button
          type="submit"
          className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default EmailShareForm;
