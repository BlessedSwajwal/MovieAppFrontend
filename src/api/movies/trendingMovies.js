import axios from "axios";

export async function trendingMovies(page) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/Trending?page=${page}`;
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

export async function addTrendingMovie(movie) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/AddTrending`;
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };
    const formData = new FormData();
    formData.append("title", movie.title);
    formData.append("description", movie.description);
    formData.append("imageUrl", movie.imageUrl);
    formData.append("releaseDate", movie.releaseDate);

    console.log("Date");
    console.log(formData);
    var result = await axios.post(apiUrl, formData, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
