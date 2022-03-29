import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.styles.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLogin = async () => {
    console.log(username, password);
    await axios({
      method: "POST",
      url: "https://notebase-api.herokuapp.com/api/student/login/",
      data: {
        username,
        password,
      },
    }).then((res) => {
      if (res.statusText === "OK") {
        navigate("main");
      } else {
        alert("Kullanıcı adı veya şifre yanlış");
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo">
          <img src={require("../../assets/logo.png")} alt="Notebase Logo" />
        </div>
        <p className="notebase-title">Notebase</p>
      </div>
      <div className="routes">
        <p className="route">About us</p>
        <p className="route">Team</p>
        <input
          type="text"
          className="text-input"
          placeholder="Kullanıcı adınız"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          className="text-input"
          placeholder="Şifreniz"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="login-button" onClick={onLogin}>
          <p className="login">Login</p>
        </div>
      </div>
    </nav>
  );
};
