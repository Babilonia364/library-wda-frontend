import axios from "../config/axios"

export function getRents() {
  return axios.get("rents/");
};

export function createRent(rent) {
  return axios.post("rents/", rent);
};