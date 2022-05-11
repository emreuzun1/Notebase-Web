import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { State } from "../../Interfaces/State";
import "./Settings.styles.css";

const Settings = () => {
  const [student, setStudent] = useState(
    useSelector((state: State) => state.auth.student?.user!)
  );

  const updateStudent = () => {};

  return (
    <div className="card">
      <div
        className="create-close-btn"
        onClick={() =>
          document.getElementById("settings-modal")?.classList.remove("isOpen")
        }
      >
        <GrClose color="black" />
      </div>
      <p style={{ fontSize: 24 }}>
        <strong>Settings</strong>
      </p>
      <form
        className="card-form"
        encType="multipart/form-data"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="card-input-wrapper">
          <p className="card-input-title">Username :</p>
          <input
            type="text"
            className="card-input"
            value={student.username}
            name="username"
            onChange={(e) =>
              setStudent({ ...student, username: e.target.value })
            }
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">University :</p>
          <input
            type="text"
            className="card-input"
            value={student.university}
            name="university"
            onChange={(e) =>
              setStudent({ ...student, university: e.target.value })
            }
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">Faculty :</p>
          <input
            type="text"
            className="card-input"
            value={student.faculty}
            name="faculty"
            onChange={(e) =>
              setStudent({ ...student, faculty: e.target.value })
            }
          />
        </div>
        <button type="submit" className="card-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;
