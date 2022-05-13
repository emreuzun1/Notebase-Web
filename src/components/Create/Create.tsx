import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Document } from "../../Interfaces/Document";
import { State } from "../../Interfaces/State";
import { createDocumentApi, giveStudentPointApi } from "../../lib/api";
import "./Create.style.css";
import Report from "../Report/Report";
import Loading from "../Loading/Loading";
import { Student } from "../../Interfaces/Student";
import { requestUser } from "../../rxutils/actions";

export const Create = () => {
  const [student, setStudent] = useState<Student>(
    useSelector((state: State) => state.auth.student!)
  );
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        await createDocumentApi(documentation, student?.token!).then(
          async (res) => {
            setLoading(false);
            if (res.status === 201) {
              await giveStudentPointApi(
                student.user.id,
                student.token,
                student.user.point + 5
              ).then((res) => {
                if (res.status === 200) {
                  dispatch(requestUser(student.user.id));
                }
              });
              toast("Your note has been created!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
              });
              toast("You have earned 5 points", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
              });
              navigate("/main");
              closeModal();
            }
          }
        );
      } else {
        setLoading(false);
        document.getElementById("report-modal")?.classList.add("isOpen");
      }
    });
  };

  if (loading) {
    return <Loading text="AI is inspecting your file" />;
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
                accept="application/pdf"
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
