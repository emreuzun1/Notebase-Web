import axios from "axios";
import fs from "fs";

import { LoginInterface, RegisterInterface } from "../Interfaces/Student";
import { Document } from "../Interfaces/Document";

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

export const createDocumentApi = async (document: Document, token: string) => {
  const { user, title, description, university, course, file } = document;
  const formdata = new FormData();
  formdata.append("user", user);
  formdata.append("title", title);
  formdata.append("course", course);
  formdata.append("description", description);
  formdata.append("university", university);
  await axios("https://notebase-api.herokuapp.com/api/document/create/", {
    method: "POST",
    data: { formdata },
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => console.log(res));
};
