import axios from "axios";

export async function getMovies(page) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies?page=${page}`;
  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };
    //var result = await axios.get(apiUrl, headers);
    var result = await axios.get(apiUrl, { headers });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
export async function searchMovies(searchQuery) {
  var apiUrl =
    import.meta.env.VITE_API_URL + `/Movies/search?searchQuery=${searchQuery}`;
  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };
    var result = await axios.get(apiUrl, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
