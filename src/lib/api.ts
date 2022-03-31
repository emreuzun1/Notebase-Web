import axios from "axios";
import { LoginInterface, RegisterInterface } from "../Interfaces/Student";

export const registerApi = (values: RegisterInterface) => {
  return axios({
    method: "POST",
    url: "https://notebase-api.herokuapp.com/api/student/register/",
    data: {
      username: values.username,
      email: values.email,
      password: values.password,
    },
  });
};

export const loginApi = (values: LoginInterface) => {
  return axios({
    method: "POST",
    url: "https://notebase-api.herokuapp.com/api/student/login/",
    data: {
      username: values.username,
      password: values.password,
    },
  });
};

export const getAllDocumentsApi = (token: string) => {
  return axios({
    method: "GET",
    url: "https://notebase-api.herokuapp.com/api/document/get/",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
