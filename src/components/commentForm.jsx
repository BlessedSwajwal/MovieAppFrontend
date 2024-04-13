import { useState } from "react";
import commentOnMovie from "../api/movies/comment";

function CommentForm({ movieId }) {
  const [commentText, setCommentText] = useState("");
  const handleComment = async () => {
    await commentOnMovie(movieId, commentText);
    location.reload();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
        className="mt-3"
      >
        <textarea
          onChange={(event) => {
            setCommentText(event.target.value);
          }}
          name="comment"
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your comment here..."
        ></textarea>
        <input
          type="text"
          className="rounded"
          id="movieId"
          name="movieId"
          hidden
          value="@movie.Id"
        />
        <button
          type="submit"
          onClick={handleComment}
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default CommentForm;
