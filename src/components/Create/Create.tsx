import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Document } from "../../Interfaces/Document";
import { State } from "../../Interfaces/State";
import { createDocumentApi } from "../../lib/api";
import "./Create.style.css";
import Report from "../Report/Report";

export const Create = () => {
  const { student } = useSelector((state: State) => state.auth);
  const file = React.createRef<HTMLInputElement>();
  const [documentation, setDocumentation] = useState<Document>({
    title: "Change Title",
    university: student!.user.university,
    department: "",
    course: "",
    file: "",
    description: "",
    date: "",
    faculty: student!.user.faculty,
    user: student!.user.id,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = () => {
    const element = document.getElementById("modal");
    element?.classList.remove("isOpen");
  };

  const createDocument = async () => {
    const formData = new FormData();
    formData.append("file", documentation.file);
    setLoading(true);
    await axios({
      url: "http://192.168.0.136:5000/",
      method: "POST",
      data: formData,
    }).then(async (res) => {
      if (res.data) {
        await createDocumentApi(documentation, student?.token!).then((res) => {
          console.log(res);
          setLoading(false);
          if (res.status === 201) {
            toast("Your note has been created!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            });
            closeModal();
          }
        });
      } else {
        setLoading(false);
        document.getElementById("report-modal")?.classList.add("isOpen");
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-card">
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="create-close-btn" onClick={closeModal}>
        <GrClose color="black" />
      </div>
      <form
        className="create-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDocument();
        }}
        encType="multipart/form-data"
      >
        <div>
          <input
            type="text"
            className="title-input"
            value={documentation?.title}
            name="title"
            onChange={(e) =>
              setDocumentation({ ...documentation, title: e.target.value })
            }
          />
          <div className="card-input-wrapper">
            <p className="card-input-title">University : </p>
            <input
              type="text"
              name="university"
              className="card-input"
              value={documentation.university}
              onChange={(e) =>
                setDocumentation({
                  ...documentation,
                  university: e.target.value,
                })
              }
            />
          </div>
          <div className="card-input-wrapper">
            <p className="card-input-title">Faculty : </p>
            <input
              type="text"
              className="card-input"
              name="faculty"
              value={documentation.faculty}
              onChange={(e) =>
                setDocumentation({
                  ...documentation,
                  faculty: e.target.value,
                })
              }
            />
          </div>
          <div className="card-input-wrapper">
            <p className="card-input-title">Course ID : </p>
            <input
              type="text"
              name="course"
              className="card-input"
              value={documentation.course}
              onChange={(e) =>
                setDocumentation({ ...documentation, course: e.target.value })
              }
            />
          </div>
          <div className="card-input-wrapper">
            <p className="card-input-title ">Description : </p>
            <textarea
              className="card-input description"
              name="description"
              value={documentation.description}
              onChange={(e) =>
                setDocumentation({
                  ...documentation,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="card-input-wrapper">
            <p className="card-input-title">PDF :</p>
            <div className="pdf-container">
              <input
                type="file"
                ref={file}
                name="file"
                onChange={(e) =>
                  setDocumentation({
                    ...documentation,
                    file: e.target.files![0],
                  })
                }
              />
            </div>
          </div>
          <button type="submit" className="card-btn">
            Post
          </button>
        </div>
      </form>
      <div className="modalView" id="report-modal">
        {file && <Report file={documentation.file} />}
      </div>
    </div>
  );
};
