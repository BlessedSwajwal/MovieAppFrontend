import axios from "axios";
import { useState } from "react";

async function createMovie(title, description, image, date) {
  var apiUrl = import.meta.env.VITE_API_URL + `/Movies/Create`;

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageFile", image);
    formData.append("releaseDate", date);

    var result = await axios.post(apiUrl, formData, { headers });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default createMovie;
