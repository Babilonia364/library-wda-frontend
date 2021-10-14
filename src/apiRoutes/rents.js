import axios from "../config/axios"

export default function getRents() {
  return axios.get("rents/");
};