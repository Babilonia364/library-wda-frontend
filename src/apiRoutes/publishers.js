import axios from "../config/axios"

export function getPublishers() {
  return axios.get("publishers/");
};