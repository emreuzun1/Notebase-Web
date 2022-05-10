import React, { FC, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Document as DocumentInterface } from "../../Interfaces/Document";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

interface IEdit {
  documentation?: DocumentInterface;
}

const Edit: FC<IEdit> = ({ documentation }) => {
  const file = React.createRef<HTMLInputElement>();
  const editHandle = () => {};
  const deleteHandle = () => {};

  const [doc, setDocumentation] = useState<DocumentInterface>(documentation!);
  return (
    <div className="card">
      <div
        className="close-btn"
        onClick={() =>
          document.getElementById("edit-modal")?.classList.remove("isOpen")
        }
      >
        <GrClose size={24} color="black" />
      </div>
      <form className="create-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="title-input"
          value={doc.title}
          name="title"
          onChange={(e) => setDocumentation({ ...doc, title: e.target.value })}
        />
        <div className="card-input-wrapper">
          <p className="card-input-title">University : </p>
          <input
            type="text"
            name="university"
            className="card-input"
            value={doc.university}
            onChange={(e) =>
              setDocumentation({ ...doc, university: e.target.value })
            }
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">Faculty : </p>
          <input
            type="text"
            className="card-input"
            name="faculty"
            value={doc.faculty}
            onChange={(e) =>
              setDocumentation({ ...doc, faculty: e.target.value })
            }
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">Course ID : </p>
          <input
            type="text"
            name="course"
            className="card-input"
            value={doc.course}
            onChange={(e) =>
              setDocumentation({ ...doc, course: e.target.value })
            }
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title ">Description : </p>
          <textarea
            className="card-input description"
            name="description"
            value={doc.description}
            onChange={(e) =>
              setDocumentation({
                ...doc,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">PDF :</p>
          <div className="pdf-container">
            <Document file={doc.file}>
              <Page pageNumber={1} height={90} />
            </Document>
            <input
              type="file"
              ref={file}
              name="file"
              onChange={(e) =>
                setDocumentation({ ...doc, file: e.target.files![0] })
              }
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button className="card-btn" onClick={editHandle}>
            Edit
          </button>
          <button
            className="card-btn"
            onClick={deleteHandle}
            style={{ backgroundColor: "var(--purple)" }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
