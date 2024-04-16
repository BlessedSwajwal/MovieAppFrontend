import axios from "axios";

async function deleteMovie(movieId) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/delete?id=${movieId}`;
  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };
    //var result = await axios.get(apiUrl, headers);
    var result = await axios.delete(apiUrl, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default deleteMovie;
