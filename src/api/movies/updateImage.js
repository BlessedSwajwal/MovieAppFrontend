import axios from "axios";

async function updateImage(movieId, image) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/UpdateImage`;
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };

    const formData = new FormData();
    formData.append("MovieId", movieId);
    formData.append("ImageFile", image);

    var result = await axios.put(apiUrl, formData, { headers });
    console.log("result");
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default updateImage;
