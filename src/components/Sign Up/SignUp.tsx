import { useState } from "react";
import { GrClose } from "react-icons/gr";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { toast } from "react-toastify";

import "./SignUp.styles.css";
import { RegisterValues } from "../../Interfaces/Student";
import { Faculties } from "../../constants/Faculty";
import { register } from "../../lib/api";
import Loading from "../Loading/Loading";

export const SignUp = () => {
  const [registerValues, setRegisterValues] = useState<RegisterValues>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    department: "",
    faculty: "",
    university: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const modalClose = () => {
    const modal = document.getElementById("signup");
    modal?.classList.remove("isOpen");
  };

  const registerF = async () => {
    setLoading(true);
    await register(registerValues).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        toast("Your account has been created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        modalClose();
      }
    });
  };

  if (loading) {
    return <Loading text="You are creating something new" />;
  }

  return (
    <div className="signup-card">
      <div className="close-btn" onClick={modalClose}>
        <GrClose size={24} color="black" />
      </div>
      <p className="signup-welcomeText">Welcome!</p>
      <p className="signup-credentialsText">
        Please fill the credentials to sign up
      </p>
      <form className="card-form">
        <div className="signup-fullnameWrapper">
          <input
            type="text"
            className="signup-input"
            placeholder="First name"
            value={registerValues.first_name}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                first_name: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="signup-input"
            placeholder="Last name"
            value={registerValues.last_name}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                last_name: e.target.value,
              })
            }
          />
        </div>
        <input
          type="email"
          className="signup-input"
          placeholder="Mail"
          value={registerValues.email}
          onChange={(e) =>
            setRegisterValues({ ...registerValues, email: e.target.value })
          }
        />
        <input
          type="text"
          className="signup-input"
          placeholder="Username"
          value={registerValues.username}
          onChange={(e) =>
            setRegisterValues({ ...registerValues, username: e.target.value })
          }
        />
        <input
          type="password"
          className="signup-input"
          placeholder="Password"
          value={registerValues.password}
          onChange={(e) =>
            setRegisterValues({ ...registerValues, password: e.target.value })
          }
        />
        <input
          type="text"
          className="signup-input"
          placeholder="University"
          value={registerValues.university}
          onChange={(e) =>
            setRegisterValues({ ...registerValues, university: e.target.value })
          }
        />
        <Dropdown
          className="signup-dropdown"
          options={Faculties}
          value={registerValues.faculty}
          placeholder="Select faculty"
          onChange={(e) =>
            setRegisterValues({ ...registerValues, faculty: e.value })
          }
        />
        <input
          type="text"
          className="signup-input"
          placeholder="Department"
          value={registerValues.department}
          onChange={(e) =>
            setRegisterValues({ ...registerValues, department: e.target.value })
          }
        />
      </form>
      <button className="signup-btn" onClick={registerF}>
        Sign Up
      </button>
    </div>
  );
};
