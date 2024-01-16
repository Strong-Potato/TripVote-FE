import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://api.tripvote",
  //headers :
  //timeout :
});

export const spacesRequest = {
  getSpaces: () => apiClient.get("/spaces").then((response) => response.data),
};