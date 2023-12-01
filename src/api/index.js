import axios from "axios";

export const BASE_URL = "http://localhost:5100/";

export const ENDPOINT = {
  register: "Account/register",
  login: "Account/login",
  tasks: "Tasks",
};

export const createAPIEndPoint = (endpoint) => {
  let url = BASE_URL + "api/" + endpoint + "/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
    login: (credentials) => axios.post(url+'login/',credentials),
    register: (userData) => axios.post(url , userData),
  };
};
