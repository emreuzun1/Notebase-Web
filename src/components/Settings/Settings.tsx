import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { State } from "../../Interfaces/State";
import { Student } from "../../Interfaces/Student";
import { editStudentApi } from "../../lib/api";
import { useDispatch } from "react-redux";
import "./Settings.styles.css";
import { requestUser } from "../../rxutils/actions";

const Settings = () => {
  const [student, setStudent] = useState<Student>(
    useSelector((state: State) => state.auth.student!)
  );
  const [stu, setStu] = useState<any>(student.user);
  const dispatch = useDispatch();

  const updateStudent = async () => {
    await editStudentApi(stu, student.token).then((res) => {
      console.log("Res", res);
      if (res.status === 200) {
        dispatch(requestUser(student.user.id));
        closeModal();
      }
    });
  };

  const closeModal = () => {
    document.getElementById("settings-modal")?.classList.remove("isOpen");
  };

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
        <strong>Edit Profile</strong>
      </p>
      <form
        className="card-form"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          updateStudent();
        }}
      >
        <div className="card-input-wrapper">
          <p className="card-input-title">Name :</p>
          <input
            type="text"
            className="card-input"
            value={stu.first_name}
            name="first_name"
            onChange={(e) => setStu({ ...stu, first_name: e.target.value })}
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">Username :</p>
          <input
            type="text"
            className="card-input"
            value={stu.username}
            name="username"
            onChange={(e) => setStu({ ...stu, username: e.target.value })}
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">University :</p>
          <input
            type="text"
            className="card-input"
            value={stu.university}
            name="university"
            onChange={(e) => setStu({ ...stu, university: e.target.value })}
          />
        </div>
        <div className="card-input-wrapper">
          <p className="card-input-title">Faculty :</p>
          <input
            type="text"
            className="card-input"
            value={stu.faculty}
            name="faculty"
            onChange={(e) => setStu({ ...stu, faculty: e.target.value })}
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
