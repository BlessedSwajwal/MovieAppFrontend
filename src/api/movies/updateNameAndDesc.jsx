import axios from "axios";

async function updateNameAndDescription(movie, title, description, date) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/Update`;
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };

    const formData = new FormData();
    formData.append("movieId", movie.id);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("releaseDate", date);

    var result = await axios.put(apiUrl, formData, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default updateNameAndDescription;
