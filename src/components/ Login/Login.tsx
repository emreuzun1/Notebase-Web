import React, { useState } from "react";
import "./Login.styles.css";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { requestLogin } from "../../rxutils/actions";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const modalClose = () => {
    const modal = document.getElementById("login");
    modal?.classList.remove("isOpen");
  };

  const signUpModal = () => {
    modalClose();
    const modal = document.getElementById("signup");
    modal?.classList.add("isOpen");
  };

  const navigate = () => {};

  const login = () => {
    dispatch(requestLogin({ username, password }, navigate));
    modalClose();
  };

  return (
    <div className="login-card">
      <div className="close-btn" onClick={modalClose}>
        <GrClose size={24} color="black" />
      </div>
      <p className="login-welcomeText">Welcome!</p>
      <p className="login-credentialsText">
        Please fill the credentials correctly to login
      </p>
      <form className="login-inputsWrapper">
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button className="login-btn" onClick={login}>
        Login
      </button>
      <p className="forgot-text">
        You do not have an account?{" "}
        <span className="signup-text" onClick={signUpModal}>
          Sign up
        </span>
      </p>
    </div>
  );
};
