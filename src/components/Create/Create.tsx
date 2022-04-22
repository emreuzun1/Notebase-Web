import React from "react";
import "./Create.style.css";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { Document } from "../../Interfaces/Document";
import { useSelector } from "react-redux";
import { State } from "../../Interfaces/State";
import { createDocumentApi } from "../../lib/api";

export const Create = () => {
  const { student } = useSelector((state: State) => state.auth);
  const file = React.createRef<HTMLInputElement>();
  const [documentation, setDocumentation] = useState<Document>({
    title: "Change Title",
    university: student!.user.username,
    department: "",
    course: "11",
    file: "",
    description: "",
    date: "",
    faculty: "",
    user: student!.user.id,
  });

  const closeModal = () => {
    const element = document.getElementById("modal");
    element?.classList.remove("isOpen");
  };

  const createDocument = async () => {
    createDocumentApi(documentation, student?.token!);
  };

  return (
    <div className="create-card">
      <div className="create-close-btn" onClick={closeModal}>
        <GrClose color="black" />
      </div>
      <form
        className="create-form"
        onSubmit={createDocument}
        encType="multipart/form-data"
      >
        <input
          type="text"
          className="title-input"
          value={documentation?.title}
          name="title"
          onChange={(e) =>
            setDocumentation({ ...documentation, title: e.target.value })
          }
        />
        <div className="create-input-wrapper">
          <p className="create-input-title">University : </p>
          <input
            type="text"
            name="university"
            className="create-input"
            value={documentation.university}
            onChange={(e) =>
              setDocumentation({ ...documentation, university: e.target.value })
            }
          />
        </div>
        <div className="create-input-wrapper">
          <p className="create-input-title">Faculty : </p>
          <input
            type="text"
            className="create-input"
            name="faculty"
            value={documentation.faculty}
            onChange={(e) =>
              setDocumentation({ ...documentation, faculty: e.target.value })
            }
          />
        </div>
        <div className="create-input-wrapper">
          <p className="create-input-title">Course ID : </p>
          <input
            type="text"
            name="course"
            className="create-input"
            value={documentation.course}
            onChange={(e) =>
              setDocumentation({ ...documentation, course: e.target.value })
            }
          />
        </div>
        <div className="create-input-wrapper">
          <p className="create-input-title ">Description : </p>
          <textarea
            className="create-input description"
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
        <div className="create-input-wrapper">
          <p className="create-input-title">PDF :</p>
          <div className="pdf-container">
            <input
              type="file"
              ref={file}
              name="file"
              onChange={(e) =>
                setDocumentation({ ...documentation, file: e.target.files![0] })
              }
            />
          </div>
        </div>
        <button type="submit" className="create-send-btn">
          Post
        </button>
      </form>
    </div>
  );
};
