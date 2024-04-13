import axios from "axios";

async function updateNameAndDescription(movie, title, description) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/Update`;
  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };

    var data = {
      movieId: movie.id,
      title: title,
      description: description,
      comments: movie.comments,
      rating: movie.rating,
      totalRates: movie.totalRates,
      image_data: movie.image,
    };
    console.log(data);
    var result = await axios.post(apiUrl, data, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default updateNameAndDescription;
