import axios from "../config/axios"

export function getUsers() {
  return axios.get("users/");
};

export function createUsers(user) {
  return axios.post("users/", user);
};