import axios from "../config/axios"

export function getBooks() {
  return axios.get("books/");
};

export function createBook(book) {
  return axios.post("books/", book)
};