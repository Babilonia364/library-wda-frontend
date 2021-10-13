import axios from "../config/axios"

export function getUsers() {
  return axios.get("users/");
};