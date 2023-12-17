import axios from "axios";

export const BASE_URL = "http://localhost:5100/";

export const ENDPOINT = {
  register: "Account/register",
  login: "Account/login",
  tasks: "Tasks/",
};

const api = axios.create({
  baseURL: "http://localhost:5100/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


export const createAPIEndPoint = (endpoint) => {
  let url = BASE_URL + "api/" + endpoint + "/";
  return {
    fetch: () => api.get(ENDPOINT.tasks),
    fetchById: (id) => api.get(ENDPOINT.tasks + id),
    post: (newRecord) => api.post(ENDPOINT.tasks, newRecord),
    put: (id, updatedRecord) => api.put(ENDPOINT.tasks + id, updatedRecord),
    delete: (id) => api.delete(ENDPOINT.tasks + id),
    login: (credentials) => axios.post(url+'login/',credentials),
    register: (userData) => axios.post(url , userData),
  };
};
