import axios from "../config/axios"

export function getPublishers() {
  return axios.get("publishers/");
};

export function createPublisher(publisher) {
  return axios.post("publishers/", publisher);
};