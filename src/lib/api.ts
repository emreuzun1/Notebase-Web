import axios from "axios";
import fs from "fs";

import { LoginInterface, RegisterValues, Student } from "../Interfaces/Student";
import { Document } from "../Interfaces/Document";
import { click } from "@testing-library/user-event/dist/click";

export const register = (values: RegisterValues) => {
  const {
    email,
    username,
    password,
    first_name,
    last_name,
    department,
    faculty,
    university,
  } = values;
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("first_name", first_name);
  formdata.append("last_name", last_name);
  formdata.append("university", university);
  formdata.append("department", department);
  formdata.append("faculty", faculty);
  return fetch("https://notebase-api.herokuapp.com/api/student/register/", {
    method: "POST",
    body: formdata,
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
  const { user, title, description, faculty, university, course, file } =
    document;
  const formdata = new FormData();
  formdata.append("user", user);
  formdata.append("title", title);
  formdata.append("course", course);
  formdata.append("description", description);
  formdata.append("university", university);
  formdata.append("faculty", faculty);
  formdata.append("file", file);
  return axios("https://notebase-api.herokuapp.com/api/document/create/", {
    method: "POST",
    data: formdata,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createDownloadApi = (
  userId: string,
  token: string,
  documentId: string
) => {
  return axios({
    method: "POST",
    url: "https://notebase-api.herokuapp.com/api/download/create/",
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      user: userId,
      document: documentId,
    },
  });
};

export const getDownloadsApi = (token: string) => {
  return axios.get(`https://notebase-api.herokuapp.com/api/download/get/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getDocumentApi = (id: string, token: string) => {
  return axios.get(
    `https://notebase-api.herokuapp.com/api/document/get/${id}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const getStudentApi = (id: string) => {
  return axios.get(`https://notebase-api.herokuapp.com/api/student/get/${id}`);
};

export const editStudentApi = (student: any, token: string) => {
  const { first_name, last_name, username, faculty } = student;
  const formdata = new FormData();
  formdata.append("first_name", first_name);
  formdata.append("last_name", last_name);
  formdata.append("username", username);
  formdata.append("faculty", faculty);
  console.log(formdata);
  return fetch(
    `https://notebase-api.herokuapp.com/api/student/edit/${student.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formdata,
    }
  );
};

export const giveStudentPointApi = (
  id: string,
  token: string,
  point: number
) => {
  const formData = new FormData();
  formData.append("point", point.toString());
  return axios({
    method: "PUT",
    url: `https://notebase-api.herokuapp.com/api/student/edit/${id}`,
    headers: {
      Authorization: `Token ${token}`,
    },
    data: formData,
  });
};

export const editDocumentApi = (document: Document, student: Student) => {
  const formData = new FormData();
  formData.append("course", document.course);
  formData.append("user", student.user.id);
  formData.append("title", document.title);
  return axios({
    method: "PUT",
    url: `https://notebase-api.herokuapp.com/api/document/edit/${document.id}`,
    headers: {
      Authorization: `Token ${student.token}`,
    },
    data: formData,
  });
};

export const deleteDocumentApi = (document: Document, student: Student) => {
  return axios({
    method: "DELETE",
    url: `https://notebase-api.herokuapp.com/api/document/delete/${document.id}`,
    headers: {
      Authorization: `Token ${student.token}`,
    },
  });
};

export const updateDownloadStatus = (
  id: string,
  student: Student,
  document: string,
  status: boolean
) => {
  let has_liked = false,
    has_disliked = false;
  if (status) {
    has_liked = true;
    has_disliked = false;
  } else {
    has_liked = false;
    has_disliked = true;
  }
  return axios({
    url: `https://notebase-api.herokuapp.com/api/download/edit/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Token ${student.token}`,
    },
    data: {
      has_liked,
      has_disliked,
      user: student.user.id,
      document,
    },
  });
};
