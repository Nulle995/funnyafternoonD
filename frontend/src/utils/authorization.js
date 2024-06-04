import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { API } from "../api";

export async function refresh() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  try {
    const res = await API.post("refresh/", {
      refresh: refreshToken,
    });
    const data = res.data;
    const newAccess = data.access;
    // console.log(data.access);
    // console.log("sadasdsadsadasdsadasdasdas");
    localStorage.setItem(ACCESS_TOKEN, newAccess);
    return newAccess;
  } catch (error) {
    // console.log("error refresh token 👇");
    // console.log(error);
  }
}

export async function auth() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  // console.log("sadaaa-------");
  // console.log(token);
  if (token) {
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    const expirationTime = decodedToken.exp;
    const now = new Date().getTime() / 1000;
    if (now > expirationTime) {
      return await refresh();
    } else {
      // console.log("else");
      // console.log(now);
      // console.log(expirationTime);
      return token;
    }
  } else {
    console.log("no hay token");
  }
}
