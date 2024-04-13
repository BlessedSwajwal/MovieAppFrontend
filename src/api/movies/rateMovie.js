import axios from "axios";

export async function rateMovie(movieId, rating) {
  var apiUrl =
    import.meta.env.VITE_API_URL +
    `/Movies/rate?movieId=${movieId}&rating=${rating}`;
  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };
    //var result = await axios.get(apiUrl, headers);
    var result = await axios.get(apiUrl, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
