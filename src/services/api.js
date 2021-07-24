import axios from "axios";

const api = axios.create({
  baseUrl: "https://kenziehub.me",
});

export default api;
