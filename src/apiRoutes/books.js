import axios from "../config/axios"

export function getBooks() {
  return axios.get("books/");
};