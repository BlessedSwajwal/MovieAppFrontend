import axios from "axios";

async function commentOnMovie(movieId, commentText) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/Comment`;

  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };

    var data = {
      commentText: commentText,
      movieId: movieId,
    };

    //var result = await axios.get(apiUrl, headers);
    var result = await axios.post(apiUrl, data, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default commentOnMovie;
