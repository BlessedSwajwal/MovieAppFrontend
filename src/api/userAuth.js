import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function login(logindata) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    var res = await axios.post(`${apiUrl}/Account/Login`, logindata);

    var data = res.data;
    localStorage.setItem("auth-token", data.token);
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function registerAccount(logindata) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    var res = await axios.post(`${apiUrl}/Account/Register`, logindata);
  } catch (error) {
    console.log(error);
    return;
  }
}

export function logout() {
  window.localStorage.removeItem("auth-token");

  window.dispatchEvent(new Event("storage"));
}

export function isAdmin() {
  let token = localStorage.getItem("auth-token");
  let decoded = jwtDecode(token);
  let userType =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  return userType == "ADMIN";
}
