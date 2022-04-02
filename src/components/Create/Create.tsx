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
    setDocumentation({ ...documentation, file: file.current?.files![0] });
    createDocumentApi(documentation, student?.token!);
  };

  return (
    <div className="create-card">
      <div className="create-close-btn" onClick={closeModal}>
        <GrClose color="black" />
      </div>
      <form className="create-form">
        <input
          type="text"
          className="title-input"
          value={documentation?.title}
          onChange={(e) =>
            setDocumentation({ ...documentation, title: e.target.value })
          }
        />
        <div className="create-input-wrapper">
          <p className="create-input-title">University : </p>
          <input
            type="text"
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
            <input type="file" ref={file} />
          </div>
        </div>
      </form>
      <button className="create-send-btn" onClick={createDocument}>
        Post
      </button>
    </div>
  );
};
