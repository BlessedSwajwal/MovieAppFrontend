import axios from "axios";

async function shareMovieWithEmail(movieId, to) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/Share`;
  var data = { movieId, to };
  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };
    //var result = await axios.get(apiUrl, headers);
    var result = await axios.post(apiUrl, data, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default shareMovieWithEmail;
